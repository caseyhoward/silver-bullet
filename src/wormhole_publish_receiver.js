var _ = require('lodash');
var EventEmitter = require('./event_emitter');

var WormholePublishReceiver = function(wormholeMessageReceiver, wormholeMessageSender) {
  var eventEmitter = new EventEmitter();

  wormholeMessageReceiver.on('publish', function(wormholeMessage) {
    var resolve = function(data) {
      wormholeMessageSender.resolve(wormholeMessage.topic, data, wormholeMessage.uuid);
    };
    var reject = function(data) {
      wormholeMessageSender.reject(wormholeMessage.topic, data, wormholeMessage.uuid);
    };
    eventEmitter.emit(wormholeMessage.topic, wormholeMessage.data, resolve, reject);
  });

  this.subscribe = function(topic, callback) {
    eventEmitter.on(topic, callback);
  };
};

module.exports = WormholePublishReceiver;
