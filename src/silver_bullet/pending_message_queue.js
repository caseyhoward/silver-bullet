var _ = require('lodash');

var PendingMessageQueue = function(silverBulletMessagePoster, silverBulletReadinessChecker) {
  var pendingMessages = [];
  var silverBulletReady = false;

  var sendPendingMessages = function() {
    // TODO: Send asynchronously. Empty items while iterating.
    _.each(pendingMessages, function(message) {
      silverBulletMessagePoster.publish(message.topic, message.data, message.uuid);
    });
    pendingMessages = undefined;
  };

  silverBulletReadinessChecker.whenReady().then(sendPendingMessages);

  this.push = function(topic, data, uuid) {
    if (silverBulletReady) {
      silverBulletMessagePoster.publish(topic, data, uuid);
    } else {
      pendingMessages.push({topic: topic, data: data, uuid: uuid});
    }
  };
};

module.exports = PendingMessageQueue;
