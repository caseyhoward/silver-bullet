var iframeOpener = require('./iframe_opener');
var Promise = require('es6-promise').Promise;

var Wormhole = function(window, origin) {
  this.subscribe = function(topic, callback) {
  };

  this.publish = function(topic, data) {
    return new Promise(function(resolve, reject) {
      resolve();
    });
  };
};

var WormholeCreator = function(iframeOpener) {
  var window;

  this.open = function(origin) {
    window = parent;
    return new Wormhole(window, origin);
  };

  this.opening = function(source) {
    iframe = iframeOpener.open(source);
    return new Wormhole(iframe.contentWindow, source);
  };
};

module.exports = new WormholeCreator(iframeOpener);
