var _ = require('lodash');

var WormholePublishReceiver = function(wormholeMessageReceiver, wormholeMessageSender) {
  var subscribeCallbacks = {};

  wormholeMessageReceiver.on('publish', function(wormholeMessage) {
    console.log('publish ');
    console.log(wormholeMessage);
    _.each(subscribeCallbacks[wormholeMessage.topic], function(callback) {
      var respond = function(data) {
        wormholeMessageSender.respond(wormholeMessage.topic, data, wormholeMessage.uuid);
      }
      var responseData = callback(wormholeMessage.data, respond);
    });
  })

  this.subscribe = function(topic, callback) {
    subscribeCallbacks[topic] = subscribeCallbacks[topic] || [];
    subscribeCallbacks[topic].push(callback);
  };
};

module.exports = WormholePublishReceiver;
