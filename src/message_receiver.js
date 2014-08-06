var eventListener = require('eventlistener');
var jsonParser = require('./json_parser.js');

var MessageReceiver = function(window, origin, callback) {
  var handleMessage = function(event) {
    if (event.origin === origin) {
      var eventData = jsonParser.parse(event.data);
      callback(eventData);
    }
  };

  this.startListening = function() {
    eventListener.add(window, 'message', handleMessage);
  };

  this.stopListening = function() {
    eventListener.remove(window, 'message', handleMessage);
  };
};

MessageReceiver.create = function(window, origin, callback) {
  return new MessageReceiver(window, origin, callback);
};

module.exports = MessageReceiver;
