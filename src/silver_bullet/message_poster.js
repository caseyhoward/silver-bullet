var serializer = require('./serializer');
var MessagePoster = require('./../message_poster');

var SilverBulletMessagePoster = function(window, origin) {
  var messagePoster = MessagePoster.create(window, origin, {serialize: serializer.serialize});

  this.publish = function(topic, data, uuid) {
    messagePoster.postMessage({type: 'publish', topic: topic, data: data, uuid: uuid});
  };

  this.resolve = function(topic, data, uuid) {
    messagePoster.postMessage({type: 'response', topic: topic, data: data, uuid: uuid});
  };

  this.reject = function(topic, data, uuid) {
    messagePoster.postMessage({type: 'rejection', topic: topic, data: data, uuid: uuid});
  };

  this.sendReady = function() {
    messagePoster.postMessage({type: 'ready'});
  };

  this.sendBeacon = function() {
    messagePoster.postMessage({type: 'beacon'});
  };
};

SilverBulletMessagePoster.create = function(window, origin) {
  return new SilverBulletMessagePoster(window, origin);
};

module.exports = SilverBulletMessagePoster;
