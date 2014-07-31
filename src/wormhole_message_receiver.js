var _ = require('lodash');
var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');
var wormholeMessageParser = require('./wormhole_message_parser');

var WormholeMessageReceiver = function(wormholeWindow, wormholeOrigin, subscribeCallbacks, wormholeMessageSender) {
  var callbacks = {ready: [], response: []};

  var handleMessage = function(event) {
    if (event.origin === wormholeOrigin) {
      var eventData = jsonParser.parse(event.data);
      if (eventData) {
        var wormholeMessage = wormholeMessageParser.parse(eventData);
        console.log('Received :');
        console.log(wormholeMessage);
        if (wormholeMessage.type === 'publish') {
          console.log(subscribeCallbacks[wormholeMessage.topic]);
          _.each(subscribeCallbacks[wormholeMessage.topic], function(callback) {
            var respond = function(data) {
              wormholeMessageSender.respond(wormholeMessage.topic, data, wormholeMessage.uuid);
            }
            var responseData = callback(wormholeMessage.data, respond);
          });
        } else if (wormholeMessage.type === 'response') {
          _.each(callbacks['response'], function(callback) { callback(wormholeMessage); });
        } else if (wormholeMessage.type === 'beacon') {
          wormholeMessageSender.sendReady();
        } else if (wormholeMessage.type === 'ready') {
          _.each(callbacks['ready'], function(callback) { callback(); });
        }
      }
    }
  };

  this.on = function(type, callback) {
    callbacks[type].push(callback);
  };

  this.startListening = function() {
    eventListener.add(window, 'message', handleMessage);
  };

  this.stopListening = function() {
    eventListener.remove(window, 'message', handleMessage);
  };
};

module.exports = WormholeMessageReceiver;
