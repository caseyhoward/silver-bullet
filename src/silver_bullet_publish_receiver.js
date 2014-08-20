var _ = require('lodash');
var EventEmitter = require('./event_emitter');

var SilverBulletPublishReceiver = function(silverBulletMessageReceiver, silverBulletMessageSender) {
  var eventEmitter = new EventEmitter();

  silverBulletMessageReceiver.on('publish', function(silverBulletMessage) {
    var resolve = function(data) {
      silverBulletMessageSender.resolve(silverBulletMessage.topic, data, silverBulletMessage.uuid);
    };
    var reject = function(data) {
      silverBulletMessageSender.reject(silverBulletMessage.topic, data, silverBulletMessage.uuid);
    };
    eventEmitter.emit(silverBulletMessage.topic, silverBulletMessage.data, resolve, reject);
  });

  this.subscribe = function(topic, callback) {
    eventEmitter.on(topic, callback);
  };
};

module.exports = SilverBulletPublishReceiver;
