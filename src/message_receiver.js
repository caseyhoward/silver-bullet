var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');

var MessageReceiver = function(window, origin, callback, options) {
  options = options || {};
  deserialize = options.deserialize || function identity(x) { return x; };

  var handleMessage = function(event) {
    if (event.origin === origin) {
      callback(deserialize(event.data));
    }
  };

  this.startListening = function() {
    eventListener.add(window, 'message', handleMessage);
  };

  this.stopListening = function() {
    eventListener.remove(window, 'message', handleMessage);
  };
};

MessageReceiver.create = function(window, origin, callback, options) {
  return new MessageReceiver(window, origin, callback, options);
};

module.exports = MessageReceiver;
