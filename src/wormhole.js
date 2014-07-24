var Promise = require('es6-promise').Promise;
var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');
var _ = require('lodash');
var WormholeMessageSender = require('../src/wormhole_message_sender.js');


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
      var wormholeData = eventData[WORMHOLE_KEY];
      var topic = wormholeData[TOPIC_KEY];
      var data = wormholeData[DATA_KEY];
      var type = wormholeData[TYPE_KEY];
      log('received: ' + type + ', ' + topic);
      if (type === 'publish') {
        _.each(subscribeCallbacks[topic], function(callback) {
          var data = callback(eventData);
          wormholeMessageSender.respond(topic, data);
        });
      } else if (type === 'response') {
        publishResolves[topic](data);
      } else if (type === 'beacon') {
        wormholeMessageSender.sendReady();
      } else if (type === 'ready') {
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
      self.publish(message[0], message[1]);
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
      if (!publishResolves[topic]) {
        return new Promise(function(resolve, reject) {
          publishResolves[topic] = resolve;
          // publishResolves[uuid] = resolve;
        });
      }
    } else {
      pendingMessages.push([topic, data]);
      return new Promise(function(resolve, reject) {
        publishResolves[topic] = resolve;
      });
    }
  };

  this.destroy = function() {
    eventListener.remove(window, 'message', handleMessage);
  };
};

module.exports = Wormhole;
