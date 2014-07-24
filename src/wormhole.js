var Promise = require('es6-promise').Promise;
var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');
var _ = require('lodash');
var WormholeMessageSender = require('../src/wormhole_message_sender');
var wormholeMessageParser = require('../src/wormhole_message_parser');

var WORMHOLE_KEY = '__wormhole__';
var TOPIC_KEY = '__topic__';
var DATA_KEY = '__data__';
var TYPE_KEY = '__type__';
var UUID_KEY = '__uuid__';

var Wormhole = function(wormholeWindow, origin) {
  var subscribeCallbacks = {};
  var publishResolves = {};
  var currentWindow = window;
  var wormholeReady = false;
  var wormholeMessageSender = new WormholeMessageSender(wormholeWindow);
  var self = this;
  pendingMessages = [];

  var log = function(string) {
    console.log(window.location.href + ': ' + string);
  };

  var handleMessage = function(event) {
    // if (event.origin == origin) {
    var eventData = jsonParser.parse(event.data);
    if (eventData) {
      var wormholeMessage = wormholeMessageParser.parse(eventData);
      log('received: ' + wormholeMessage.type + ', ' + wormholeMessage.topic);
      if (wormholeMessage.type === 'publish') {
        _.each(subscribeCallbacks[wormholeMessage.topic], function(callback) {
          var data = callback(wormholeMessage.data);
          wormholeMessageSender.respond(wormholeMessage.topic, data);
        });
      } else if (wormholeMessage.type === 'response') {
        publishResolves[wormholeMessage.topic](wormholeMessage.data);
      } else if (wormholeMessage.type === 'beacon') {
        wormholeMessageSender.sendReady();
      } else if (wormholeMessage.type === 'ready') {
        if (!wormholeReady) { // In case we get another response from a different beacon
          wormholeReady = true;
          sendPendingMessages();
        }
      }
    }
    // }
  };
  eventListener.add(currentWindow, 'message', handleMessage);

  var sendBeaconsUntilReady = function() {
    if (!wormholeReady) {
      wormholeMessageSender.sendBeacon();
      setTimeout(sendBeaconsUntilReady, 100);
    }
  };

  var sendPendingMessages = function() {
    _.each(pendingMessages, function(message) {
      self.publish(message.topic, message.data);
    });
  };

  setTimeout(sendBeaconsUntilReady, 100);

  this.subscribe = function(topic, callback) {
    subscribeCallbacks[topic] = subscribeCallbacks[topic] || [];
    subscribeCallbacks[topic].push(callback);
  };

  this.publish = function(topic, data) {
    if (wormholeReady) {
      wormholeMessageSender.publish(topic, data);
    } else {
      pendingMessages.push({topic: topic, data: data});
    }
    if (!publishResolves[topic]) {
      return new Promise(function(resolve, reject) {
        publishResolves[topic] = resolve;
        // publishResolves[uuid] = resolve;
      });
    }
  };

  this.destroy = function() {
    eventListener.remove(window, 'message', handleMessage);
  };
};

module.exports = Wormhole;
