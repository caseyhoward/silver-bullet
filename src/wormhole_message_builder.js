var WormholeMessageBuilder = function() {
  var WORMHOLE_KEY = '__wormhole__';
  var TOPIC_KEY = '__topic__';
  var DATA_KEY = '__data__';
  var TYPE_KEY = '__type__';
  var UUID_KEY = '__uuid__';


  this.build = function(data) {
    var message = {};
    message[WORMHOLE_KEY] = {};
    message[WORMHOLE_KEY][TYPE_KEY] = data.type;
    message[WORMHOLE_KEY][TOPIC_KEY] = data.topic;
    message[WORMHOLE_KEY][DATA_KEY] = data.data;
    message[WORMHOLE_KEY][UUID_KEY] = data.uuid;
    return message;
  };
};

module.exports = new WormholeMessageBuilder();
