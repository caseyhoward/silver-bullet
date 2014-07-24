var WormholeMessageParser = function() {
  var WORMHOLE_KEY = '__wormhole__';
  var TOPIC_KEY = '__topic__';
  var DATA_KEY = '__data__';
  var TYPE_KEY = '__type__';
  var UUID_KEY = '__uuid__';

  this.parse = function(message) {
    var data = {};
    var wormholeData = message[WORMHOLE_KEY];
    data.type = wormholeData[TYPE_KEY];
    data.topic = wormholeData[TOPIC_KEY];
    data.data = wormholeData[DATA_KEY];
    return data;
  };
};

module.exports = new WormholeMessageParser();
