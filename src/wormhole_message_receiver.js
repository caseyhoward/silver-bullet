var eventListener = require('eventlistener');
var wormholeMessageParser = require('./wormhole_message_parser');
var MessageReceiver = require('./message_receiver');
var EventEmitter = require('./event_emitter');

var WormholeMessageReceiver = function(wormholeWindow, wormholeOrigin) {
  var eventEmitter = EventEmitter.create();
  var receivedMessage = function(eventData) {
    var wormholeMessage;
    if (eventData) {
      wormholeMessage = wormholeMessageParser.parse(eventData);
      eventEmitter.emit(wormholeMessage.type, wormholeMessage);
    }
  };

  var messageReceiver = MessageReceiver.create(window, wormholeOrigin, receivedMessage);

  this.on = function(type, callback) {
    eventEmitter.on(type, callback);
  };

  this.off = function(type, callback) {
    eventEmitter.off(type, callback);
  };

  this.startListening = messageReceiver.startListening;
  this.stopListening = messageReceiver.stopListening;
};

module.exports = WormholeMessageReceiver;
