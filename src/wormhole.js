var Promise = require('es6-promise').Promise;
var _ = require('lodash');
var WormholeMessageSender = require('./wormhole_message_sender');
var WormholeMessagePublisher = require('./wormhole_message_publisher');
var WormholeMessageReceiver = require('./wormhole_message_receiver');
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
