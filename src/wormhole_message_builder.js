var WormholeMessageBuilder = function() {
  var WORMHOLE_KEY = '__wormhole__';
  var TOPIC_KEY = '__topic__';
  var DATA_KEY = '__data__';
  var TYPE_KEY = '__type__';
  // var UUID_KEY = '__uuid__';


  this.build = function(type, topic, eventData) {
    var data = {};
    data[WORMHOLE_KEY] = {};
    data[WORMHOLE_KEY][TYPE_KEY] = type;
    data[WORMHOLE_KEY][TOPIC_KEY] = topic;
    data[WORMHOLE_KEY][DATA_KEY] = eventData;
    // data[WORMHOLE_KEY][UUID_KEY] = createUUID();
    console.log(data);
    return data;
  };
};

module.exports = new WormholeMessageBuilder();
