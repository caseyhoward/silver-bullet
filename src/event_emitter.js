var _ = require('lodash');
var NodeEventEmitter = require('events').EventEmitter;
var forward = function(destination, source) {
  _.each(_.rest(_.rest(arguments)), function(property) {
    destination[property] = source[property];
  });
};

var EventEmitter = function() {
  var eventEmitter = new NodeEventEmitter();
  forward(this, eventEmitter, 'on', 'emit');
  this.off = eventEmitter.removeListener;
};

EventEmitter.create = function() {
  return new EventEmitter;
};

module.exports = EventEmitter;

