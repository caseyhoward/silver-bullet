var eventListener = require('eventlistener');
var deserializer = require('./silver_bullet/deserializer');
var MessageReceiver = require('./message_receiver');
var EventEmitter = require('./event_emitter');

var SilverBulletMessageReceiver = function(window, origin) {
  var eventEmitter = EventEmitter.create();
  var receivedMessage = function(message) {
    if (message) {
      eventEmitter.emit(message.type, message);
    }
  };

  var messageReceiver = MessageReceiver.create(window, origin, receivedMessage, {deserialize: deserializer.deserialize});

  this.on = function(type, callback) {
    eventEmitter.on(type, callback);
  };

  this.off = function(type, callback) {
    eventEmitter.off(type, callback);
  };

  this.startListening = messageReceiver.startListening;
  this.stopListening = messageReceiver.stopListening;
};

SilverBulletMessageReceiver.create = function(window, origin) {
  return new SilverBulletMessageReceiver(window, origin);
};

module.exports = SilverBulletMessageReceiver;
