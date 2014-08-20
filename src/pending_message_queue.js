var _ = require('lodash');

var PendingMessageQueue = function(silverBulletMessageSender, silverBulletReadinessChecker) {
  var pendingMessages = [];
  var silverBulletReady = false;

  var sendPendingMessages = function() {
    _.each(pendingMessages, function(message) {
      silverBulletMessageSender.publish(message.topic, message.data, message.uuid);
    });
    pendingMessages = undefined;
  };

  silverBulletReadinessChecker.whenReady().then(sendPendingMessages);

  this.push = function(topic, data, uuid) {
    if (silverBulletReady) {
      silverBulletMessageSender.publish(topic, data, uuid);
    } else {
      pendingMessages.push({topic: topic, data: data, uuid: uuid});
    }
  };
};

module.exports = PendingMessageQueue;
