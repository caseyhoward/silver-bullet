var Promise = require('es6-promise').Promise;
var uuidGenerator = require('./uuid_generator');
var _ = require('lodash');

var WormholeMessagePublisher = function(wormholeMessageSender, wormholeMessageReceiver, wormholeReadinessChecker) {
  var pendingMessages = [];
  var publishResolves = {};
  var wormholeReady = false;

  var sendPendingMessages = function() {
    wormholeReady = true;
    _.each(pendingMessages, function(message) {
      wormholeMessageSender.publish(message.topic, message.data, message.uuid);
    });
  };

  this.push = function(topic, data) {
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

  wormholeReadinessChecker.whenReady().then(sendPendingMessages);

  wormholeMessageReceiver.on('response', function(wormholeMessage) {
    publishResolves[wormholeMessage.uuid](wormholeMessage.data);
  });
}

module.exports = WormholeMessagePublisher;
