var wormholeMessageBuilder = require('./wormhole_message_builder');
var messagePoster = require('./message_poster');

var WormholeMessageSender = function(wormholeWindow) {
  this.publish = function(topic, data) {
    var message = wormholeMessageBuilder.build('publish', topic, data);
    messagePoster.postMessage(wormholeWindow, message, '*');
    return message.uuid;
  };

  this.respond = function(topic, data) {
    var message = wormholeMessageBuilder.build('response', topic, data);
    messagePoster.postMessage(wormholeWindow, message, '*');
  };

  this.sendReady = function() {
    var message = wormholeMessageBuilder.build('ready');
    messagePoster.postMessage(wormholeWindow, message, '*');
  };

  this.sendBeacon = function() {
    var message = wormholeMessageBuilder.build('beacon');
    messagePoster.postMessage(wormholeWindow, message, '*');
  };
};

module.exports = WormholeMessageSender;
