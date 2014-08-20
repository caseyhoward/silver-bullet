var silverBulletMessageBuilder = require('./silver_bullet_message_builder');
var MessagePoster = require('./message_poster');

var SilverBulletMessageSender = function(silverBulletWindow, origin) {
  var messagePoster = MessagePoster.create(silverBulletWindow, origin);

  this.publish = function(topic, data, uuid) {
    var message = silverBulletMessageBuilder.build({type: 'publish', topic: topic, data: data, uuid: uuid});
    messagePoster.postMessage(message);
  };

  this.resolve = function(topic, data, uuid) {
    var message = silverBulletMessageBuilder.build({type: 'response', topic: topic, data: data, uuid: uuid});
    messagePoster.postMessage(message);
  };

  this.reject = function(topic, data, uuid) {
    var message = silverBulletMessageBuilder.build({type: 'rejection', topic: topic, data: data, uuid: uuid});
    messagePoster.postMessage(message);
  };

  this.sendReady = function() {
    var message = silverBulletMessageBuilder.build({type: 'ready'});
    messagePoster.postMessage(message);
  };

  this.sendBeacon = function() {
    var message = silverBulletMessageBuilder.build({type: 'beacon'});
    messagePoster.postMessage(message);
  };
};

module.exports = SilverBulletMessageSender;
