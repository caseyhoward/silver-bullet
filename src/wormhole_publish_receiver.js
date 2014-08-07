var _ = require('lodash');
var EventEmitter = require('./event_emitter');

var WormholePublishReceiver = function(wormholeMessageReceiver, wormholeMessageSender) {
  var eventEmitter = new EventEmitter();

  wormholeMessageReceiver.on('publish', function(wormholeMessage) {
    var respond = function(data) {
      wormholeMessageSender.respond(wormholeMessage.topic, data, wormholeMessage.uuid);
    };
    eventEmitter.emit(wormholeMessage.topic, wormholeMessage.data, respond);
  })

  this.subscribe = function(topic, callback) {
    eventEmitter.on(topic, callback);
  };
};

module.exports = WormholePublishReceiver;
