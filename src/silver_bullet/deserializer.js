var messageKeys = require('../message_keys');
var jsonParser = require('../json_parser.js');

var Deserializer = function() {
  this.deserialize = function(message) {
    var data = {};
    var silverBulletData = jsonParser.parse(message)[messageKeys.WORMHOLE];
    data.type = silverBulletData[messageKeys.TYPE];
    data.topic = silverBulletData[messageKeys.TOPIC];
    data.data = silverBulletData[messageKeys.DATA];
    data.uuid = silverBulletData[messageKeys.UUID];
    return data;
  };
};

module.exports = new Deserializer();
