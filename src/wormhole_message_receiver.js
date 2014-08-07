var _ = require('lodash');
var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');
var wormholeMessageParser = require('./wormhole_message_parser');
var MessageReceiver = require('./message_receiver');
var EventEmitter = require('./event_emitter');

var WormholeMessageReceiver = function(wormholeWindow, wormholeOrigin, wormholeMessageSender) {
  var eventEmitter = EventEmitter.create();

  var messageReceiver = new MessageReceiver(window, wormholeOrigin, function(eventData) {
    if (eventData) {
      var wormholeMessage = wormholeMessageParser.parse(eventData);
      if (wormholeMessage.type === 'publish') {
        eventEmitter.emit('publish', wormholeMessage);
      } else if (wormholeMessage.type === 'response') {
        eventEmitter.emit('response', wormholeMessage);
      } else if (wormholeMessage.type === 'beacon') {
        wormholeMessageSender.sendReady();
      } else if (wormholeMessage.type === 'ready') {
        eventEmitter.emit('ready');
      }
    }
  });

  this.on = function(type, callback) {
    eventEmitter.on(type, callback);
  };

  this.startListening = messageReceiver.startListening;
  this.stopListening = messageReceiver.stopListening;
};

module.exports = WormholeMessageReceiver;
