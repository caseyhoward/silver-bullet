var NodeEventEmitter = require('events').EventEmitter;

var EventEmitter = function() {
  var eventEmitter = new NodeEventEmitter();

  this.on = eventEmitter.on;
  this.emit = eventEmitter.emit;
};

EventEmitter.create = function() {
  return new EventEmitter;
};

module.exports = EventEmitter;

