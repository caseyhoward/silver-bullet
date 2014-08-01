var messageKeys = require('./message_keys');

var WormholeMessageParser = function() {
  this.parse = function(message) {
    var data = {};
    var wormholeData = message[messageKeys.WORMHOLE];
    data.type = wormholeData[messageKeys.TYPE];
    data.topic = wormholeData[messageKeys.TOPIC];
    data.data = wormholeData[messageKeys.DATA];
    data.uuid = wormholeData[messageKeys.UUID];
    return data;
  };
};

module.exports = new WormholeMessageParser();
