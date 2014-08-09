var _ = require('lodash');
var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');
var wormholeMessageParser = require('./wormhole_message_parser');
var MessageReceiver = require('./message_receiver');
var EventEmitter = require('./event_emitter');

var WormholeMessageReceiver = function(wormholeWindow, wormholeOrigin, wormholeMessageSender) {
  var eventEmitter = EventEmitter.create();

  var messageReceiver = new MessageReceiver(window, wormholeOrigin, function(eventData) {
    var wormholeMessage;
    if (eventData) {
      wormholeMessage = wormholeMessageParser.parse(eventData);
      eventEmitter.emit(wormholeMessage.type, wormholeMessage);
    }
  });

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
