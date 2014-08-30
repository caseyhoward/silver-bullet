var SilverBulletMessagePublisher = require('./silver_bullet_message_publisher');
var SilverBulletBeaconSender = require('./silver_bullet_beacon_sender');
var SilverBulletBeaconResponder = require('./silver_bullet_beacon_responder');
var SilverBulletReadinessChecker = require('./silver_bullet_readiness_checker');
var SilverBulletPublishReceiver = require('./silver_bullet_publish_receiver');
var PendingMessageQueue = require('./silver_bullet/pending_message_queue');

var SilverBullet = function(silverBulletMessagePoster, silverBulletMessageReceiver) {
  var silverBulletReadinessChecker = new SilverBulletReadinessChecker(silverBulletMessageReceiver);
  var pendingMessageQueue = new PendingMessageQueue(silverBulletMessagePoster, silverBulletReadinessChecker);
  var silverBulletMessagePublisher = new SilverBulletMessagePublisher(silverBulletMessageReceiver, pendingMessageQueue);
  var silverBulletBeaconSender = new SilverBulletBeaconSender(silverBulletMessagePoster, silverBulletReadinessChecker, setTimeout);
  var silverBulletPublishReceiver = new SilverBulletPublishReceiver(silverBulletMessageReceiver, silverBulletMessagePoster);
  new SilverBulletBeaconResponder(silverBulletMessageReceiver, silverBulletMessagePoster);
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

SilverBullet.create = function(silverBulletMessagePoster, silverBulletMessageReceiver) {
  return new SilverBullet(silverBulletMessagePoster, silverBulletMessageReceiver);
};

module.exports = SilverBullet;
