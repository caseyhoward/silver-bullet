var eventListener = require('eventlistener');
var silverBulletMessageParser = require('./silver_bullet_message_parser');
var MessageReceiver = require('./message_receiver');
var EventEmitter = require('./event_emitter');

var SilverBulletMessageReceiver = function(silverBulletWindow, silverBulletOrigin) {
  var eventEmitter = EventEmitter.create();
  var receivedMessage = function(eventData) {
    var silverBulletMessage;
    if (eventData) {
      silverBulletMessage = silverBulletMessageParser.parse(eventData);
      eventEmitter.emit(silverBulletMessage.type, silverBulletMessage);
    }
  };

  var messageReceiver = MessageReceiver.create(window, silverBulletOrigin, receivedMessage);

  this.on = function(type, callback) {
    eventEmitter.on(type, callback);
  };

  this.off = function(type, callback) {
    eventEmitter.off(type, callback);
  };

  this.startListening = messageReceiver.startListening;
  this.stopListening = messageReceiver.stopListening;
};

module.exports = SilverBulletMessageReceiver;
