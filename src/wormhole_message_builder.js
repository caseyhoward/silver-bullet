var messageKeys = require('./message_keys');

var WormholeMessageBuilder = function() {
  this.build = function(data) {
    var message = {};
    message[messageKeys.WORMHOLE] = {};
    message[messageKeys.WORMHOLE][messageKeys.TYPE] = data.type;
    message[messageKeys.WORMHOLE][messageKeys.TOPIC] = data.topic;
    message[messageKeys.WORMHOLE][messageKeys.DATA] = data.data;
    message[messageKeys.WORMHOLE][messageKeys.UUID] = data.uuid;
    return message;
  };
};

module.exports = new WormholeMessageBuilder();
