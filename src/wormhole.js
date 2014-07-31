var Promise = require('es6-promise').Promise;
var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');
var _ = require('lodash');
var WormholeMessageSender = require('./wormhole_message_sender');
var wormholeMessageParser = require('./wormhole_message_parser');
var WormholeMessagePublisher = require('./wormhole_message_publisher');
var liteUrl = require('lite-url');

var WormholeReadinessChecker = function(wormholeMessageReceiver) {
  var resolves = [];

  wormholeMessageReceiver.on('ready', function() {
    _.each(resolves, function(resolve) { resolve(); });
  })

  this.whenReady = function() {
    var promise = new Promise(function(resolve, reject) {
      resolves.push(resolve);
    });
    return promise;
  };
};

var WormholeBeaconSender = function(wormholeMessageSender, wormholeMessageReceiver, wormholeReadinessChecker) {
  var wormholeReady = false;
  var sendBeaconsUntilReady = function() {
    if (!wormholeReady) {
      wormholeMessageSender.sendBeacon();
      setTimeout(sendBeaconsUntilReady, 1000);
    }
  };
  setTimeout(sendBeaconsUntilReady, 100);
  wormholeReadinessChecker.whenReady().then(function() { wormholeReady = true; });
};

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
}

var Wormhole = function(wormholeWindow, url) {
  var wormholeOrigin = liteUrl(url).origin;
  var subscribeCallbacks = {};
  var self = this;
  var wormholeMessageSender = new WormholeMessageSender(wormholeWindow, wormholeOrigin);
  var wormholeMessageReceiver = new WormholeMessageReceiver(wormholeWindow, wormholeOrigin, subscribeCallbacks, wormholeMessageSender);
  var wormholeReadinessChecker = new WormholeReadinessChecker(wormholeMessageReceiver);
  var wormholeMessagePublisher = new WormholeMessagePublisher(wormholeMessageSender, wormholeMessageReceiver, wormholeReadinessChecker);
  new WormholeBeaconSender(wormholeMessageSender, wormholeMessageReceiver, wormholeReadinessChecker);
  wormholeMessageReceiver.startListening();

  this.subscribe = function(topic, callback) {
    subscribeCallbacks[topic] = subscribeCallbacks[topic] || [];
    subscribeCallbacks[topic].push(callback);
  };

  this.publish = function(topic, data) {
    return wormholeMessagePublisher.push(topic, data);
  };

  this.destroy = function() {
    wormholeMessageReceiver.stopListening();
  };
};

module.exports = Wormhole;
