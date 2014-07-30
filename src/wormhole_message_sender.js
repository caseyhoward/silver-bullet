var wormholeMessageBuilder = require('./wormhole_message_builder');
var messagePoster = require('./message_poster');

var WormholeMessageSender = function(wormholeWindow, origin) {
  this.publish = function(topic, data, uuid) {
    var message = wormholeMessageBuilder.build({type: 'publish', topic: topic, data: data, uuid: uuid});
    messagePoster.postMessage(wormholeWindow, message, origin);
  };

  this.respond = function(topic, data, uuid) {
    var message = wormholeMessageBuilder.build({type: 'response', topic: topic, data: data, uuid: uuid});
    messagePoster.postMessage(wormholeWindow, message, origin);
  };

  this.sendReady = function() {
    var message = wormholeMessageBuilder.build({type: 'ready'});
    messagePoster.postMessage(wormholeWindow, message, origin);
  };

  this.sendBeacon = function() {
    var message = wormholeMessageBuilder.build({type: 'beacon'});
    messagePoster.postMessage(wormholeWindow, message, origin);
  };
};

module.exports = WormholeMessageSender;
