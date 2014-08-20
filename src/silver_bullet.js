var SilverBulletMessageSender = require('./silver_bullet_message_sender');
var SilverBulletMessagePublisher = require('./silver_bullet_message_publisher');
var SilverBulletMessageReceiver = require('./silver_bullet_message_receiver');
var SilverBulletBeaconSender = require('./silver_bullet_beacon_sender');
var SilverBulletBeaconResponder = require('./silver_bullet_beacon_responder');
var SilverBulletReadinessChecker = require('./silver_bullet_readiness_checker');
var SilverBulletPublishReceiver = require('./silver_bullet_publish_receiver');
var PendingMessageQueue = require('./pending_message_queue');
var liteUrl = require('lite-url');

var SilverBullet = function(silverBulletWindow, url) {
  var silverBulletOrigin = liteUrl(url).origin;
  var self = this;
  var silverBulletMessageSender = new SilverBulletMessageSender(silverBulletWindow, silverBulletOrigin);
  var silverBulletMessageReceiver = new SilverBulletMessageReceiver(silverBulletWindow, silverBulletOrigin, silverBulletMessageSender);
  var silverBulletReadinessChecker = new SilverBulletReadinessChecker(silverBulletMessageReceiver);
  var pendingMessageQueue = new PendingMessageQueue(silverBulletMessageSender, silverBulletReadinessChecker);
  var silverBulletMessagePublisher = new SilverBulletMessagePublisher(silverBulletMessageReceiver, pendingMessageQueue);
  var silverBulletBeaconSender = new SilverBulletBeaconSender(silverBulletMessageSender, silverBulletReadinessChecker, setTimeout);
  var silverBulletPublishReceiver = new SilverBulletPublishReceiver(silverBulletMessageReceiver, silverBulletMessageSender);
  var silverBulletBeaconResponder = new SilverBulletBeaconResponder(silverBulletMessageReceiver, silverBulletMessageSender);
  silverBulletBeaconSender.start();
  silverBulletMessageReceiver.startListening();

  this.on = function(topic, callback) {
    silverBulletPublishReceiver.subscribe(topic, callback);
  };

  this.emit = function(topic, data) {
    return silverBulletMessagePublisher.push(topic, data);
  };

  this.destroy = function() {
    silverBulletMessageReceiver.stopListening();
    // TODO: silverBulletBeaconSender.stop();
  };
};

SilverBullet.create = function(silverBulletWindow, url) {
  return new SilverBullet(silverBulletWindow, url);
};

module.exports = SilverBullet;
