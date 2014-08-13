var Promise = require('es6-promise').Promise;
var uuidGenerator = require('./uuid_generator');
var _ = require('lodash');

var WormholeMessagePublisher = function(wormholeMessageReceiver, pendingMessageQueue) {
  var callbacks = {
    response: {},
    rejection: {}
  };

  _.each(['response', 'rejection'], function(topic) {
    wormholeMessageReceiver.on(topic, function(wormholeMessage) {
      callbacks[topic][wormholeMessage.uuid](wormholeMessage.data);
      delete callbacks.response[wormholeMessage.uuid];
      delete callbacks.rejection[wormholeMessage.uuid];
    });
  });

  this.push = function(topic, data) {
    var uuid = uuidGenerator.generate();
    pendingMessageQueue.push(topic, data, uuid);
    return new Promise(function(resolve, reject) {
      callbacks.response[uuid] = resolve;
      callbacks.rejection[uuid] = reject;
    });
  };
};

module.exports = WormholeMessagePublisher;
