var Promise = require('es6-promise').Promise;
var uuidGenerator = require('./uuid_generator');

var WormholeMessagePublisher = function(wormholeMessageReceiver, pendingMessageQueue) {
  var publishResolves = {};
  var publishRejects = {};

  this.push = function(topic, data) {
    var uuid = uuidGenerator.generate();
    pendingMessageQueue.push(topic, data, uuid);
    return new Promise(function(resolve, reject) {
      publishResolves[uuid] = resolve;
      publishRejects[uuid] = reject;
    });
  };

  wormholeMessageReceiver.on('response', function(wormholeMessage) {
    publishResolves[wormholeMessage.uuid](wormholeMessage.data);
  });

  wormholeMessageReceiver.on('rejection', function(wormholeMessage) {
    publishRejects[wormholeMessage.uuid](wormholeMessage.data);
  });
};

module.exports = WormholeMessagePublisher;
