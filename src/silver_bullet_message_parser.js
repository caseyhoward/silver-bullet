var messageKeys = require('./message_keys');

var SilverBulletMessageParser = function() {
  this.parse = function(message) {
    var data = {};
    var silverBulletData = message[messageKeys.WORMHOLE];
    data.type = silverBulletData[messageKeys.TYPE];
    data.topic = silverBulletData[messageKeys.TOPIC];
    data.data = silverBulletData[messageKeys.DATA];
    data.uuid = silverBulletData[messageKeys.UUID];
    return data;
  };
};

module.exports = new SilverBulletMessageParser();
