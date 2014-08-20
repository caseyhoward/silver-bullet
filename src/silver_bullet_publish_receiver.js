var _ = require('lodash');

var SilverBulletPublishReceiver = function(silverBulletMessageReceiver, silverBulletMessageSender) {
  var callbacks = {};
  var resolves = {};

  silverBulletMessageReceiver.on('publish', function(silverBulletMessage) {
    // TODO: Ensure we don't resolve/return or reject/throw more than once per topic
    resolve = function(data) {
      silverBulletMessageSender.resolve(silverBulletMessage.topic, data, silverBulletMessage.uuid);
    };
    var reject = function(data) {
      silverBulletMessageSender.reject(silverBulletMessage.topic, data, silverBulletMessage.uuid);
    };
    try {
      _.each(callbacks[silverBulletMessage.topic], function(callback) {
        var returnValue = callback(silverBulletMessage.data, resolve, reject);
        if (returnValue) { resolve(returnValue); }
      });
    } catch (error) {
      reject(error);
    }
  });

  this.subscribe = function(topic, callback) {
    callbacks[topic] = callbacks[topic] || [];
    callbacks[topic].push(callback);
  };
};

module.exports = SilverBulletPublishReceiver;
