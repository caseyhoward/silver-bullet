var Promise = require('es6-promise').Promise;
var uuidGenerator = require('./uuid_generator');

var WormholeMessagePublisher = function(wormholeMessageReceiver, pendingMessageQueue) {
  var publishResolves = {};

  this.push = function(topic, data) {
    var uuid = uuidGenerator.generate();
    pendingMessageQueue.push(topic, data, uuid);
    return new Promise(function(resolve, reject) {
      publishResolves[uuid] = resolve;
    });
  };

  wormholeMessageReceiver.on('response', function(wormholeMessage) {
    publishResolves[wormholeMessage.uuid](wormholeMessage.data);
  });
};

module.exports = WormholeMessagePublisher;
