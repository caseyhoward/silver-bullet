var Wormhole = require('./wormhole');
var iframeOpener = require('./iframe_opener');

var WormholeCreator = function(iframeOpener) {
  this.open = function(origin) {
    return new Wormhole(parent, origin);
  };

  this.opening = function(source) {
    iframe = iframeOpener.open(source);
    return new Wormhole(iframe.contentWindow, source);
  };
};

module.exports = new WormholeCreator(iframeOpener);
