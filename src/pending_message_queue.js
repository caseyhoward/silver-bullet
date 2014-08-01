var _ = require('lodash');

var PendingMessageQueue = function(wormholeMessageSender, wormholeReadinessChecker) {
  var pendingMessages = [];
  var wormholeReady = false;

  var sendPendingMessages = function() {
    _.each(pendingMessages, function(message) {
      wormholeMessageSender.publish(message.topic, message.data, message.uuid);
    });
    pendingMessages = undefined;
  };

  wormholeReadinessChecker.whenReady().then(sendPendingMessages);

  this.push = function(topic, data, uuid) {
    if (wormholeReady) {
      wormholeMessageSender.publish(topic, data, uuid);
    } else {
      pendingMessages.push({topic: topic, data: data, uuid: uuid});
    }
  };
};

module.exports = PendingMessageQueue;
