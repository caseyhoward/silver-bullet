var wormholeMessageBuilder = require('./wormhole_message_builder');
var MessagePoster = require('./message_poster');

var WormholeMessageSender = function(wormholeWindow, origin) {
  var messagePoster = MessagePoster.create(wormholeWindow, origin);

  this.publish = function(topic, data, uuid) {
    var message = wormholeMessageBuilder.build({type: 'publish', topic: topic, data: data, uuid: uuid});
    messagePoster.postMessage(message);
  };

  this.respond = function(topic, data, uuid) {
    var message = wormholeMessageBuilder.build({type: 'response', topic: topic, data: data, uuid: uuid});
    messagePoster.postMessage(message);
  };

  this.sendReady = function() {
    var message = wormholeMessageBuilder.build({type: 'ready'});
    messagePoster.postMessage(message);
  };

  this.sendBeacon = function() {
    var message = wormholeMessageBuilder.build({type: 'beacon'});
    messagePoster.postMessage(message);
  };
};

module.exports = WormholeMessageSender;
