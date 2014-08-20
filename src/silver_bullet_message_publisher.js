var Promise = require('es6-promise').Promise;
var uuidGenerator = require('./uuid_generator');
var _ = require('lodash');

var SilverBulletMessagePublisher = function(silverBulletMessageReceiver, pendingMessageQueue) {
  var callbacks = {
    response: {},
    rejection: {}
  };

  _.each(['response', 'rejection'], function(topic) {
    silverBulletMessageReceiver.on(topic, function(silverBulletMessage) {
      callbacks[topic][silverBulletMessage.uuid](silverBulletMessage.data);
      delete callbacks.response[silverBulletMessage.uuid];
      delete callbacks.rejection[silverBulletMessage.uuid];
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

module.exports = SilverBulletMessagePublisher;
