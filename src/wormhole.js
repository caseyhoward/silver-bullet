var Promise = require('es6-promise').Promise;
var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');
var _ = require('lodash');
var WormholeMessageSender = require('./wormhole_message_sender');
var wormholeMessageParser = require('./wormhole_message_parser');
var uuidGenerator = require('./uuid_generator');

var Wormhole = function(wormholeWindow, origin) {
  var subscribeCallbacks = {};
  var publishResolves = {};
  var currentWindow = window;
  var wormholeReady = false;
  var wormholeMessageSender = new WormholeMessageSender(wormholeWindow);
  var self = this;
  pendingMessages = [];

  var handleMessage = function(event) {
    var sendPendingMessages = function() {
      _.each(pendingMessages, function(message) {
        wormholeMessageSender.publish(message.topic, message.data, message.uuid);
      });
    };

    // if (event.origin == origin) {
    var eventData = jsonParser.parse(event.data);
    if (eventData) {
      var wormholeMessage = wormholeMessageParser.parse(eventData);
      console.log('Received :');
      console.log(wormholeMessage);
      if (wormholeMessage.type === 'publish') {
        console.log(subscribeCallbacks[wormholeMessage.topic]);
        _.each(subscribeCallbacks[wormholeMessage.topic], function(callback) {
          var responseData = callback(wormholeMessage.data);
          wormholeMessageSender.respond(wormholeMessage.topic, responseData, wormholeMessage.uuid);
        });
        wormholeReady = true;
        sendPendingMessages();
      } else if (wormholeMessage.type === 'response') {
        publishResolves[wormholeMessage.uuid](wormholeMessage.data);
      } else if (wormholeMessage.type === 'beacon') {
        wormholeMessageSender.sendReady();
      } else if (wormholeMessage.type === 'ready') {
        wormholeReady = true;
        sendPendingMessages();
      }
    }
    // }
  };
  eventListener.add(currentWindow, 'message', handleMessage);

  var sendBeaconsUntilReady = function() {
    if (!wormholeReady) {
      wormholeMessageSender.sendBeacon();
      setTimeout(sendBeaconsUntilReady, 1000);
    }
  };

  setTimeout(sendBeaconsUntilReady, 100);

  this.subscribe = function(topic, callback) {
    subscribeCallbacks[topic] = subscribeCallbacks[topic] || [];
    subscribeCallbacks[topic].push(callback);
  };

  this.publish = function(topic, data) {
    // outgoingMessageQueue.push(topic, data);
    var uuid = uuidGenerator.generate();
    if (wormholeReady) {
      wormholeMessageSender.publish(topic, data, uuid);
    } else {
      pendingMessages.push({topic: topic, data: data, uuid: uuid});
    }
    return new Promise(function(resolve, reject) {
      publishResolves[uuid] = resolve;
    });
  };

  this.destroy = function() {
    eventListener.remove(window, 'message', handleMessage);
  };
};

module.exports = Wormhole;
