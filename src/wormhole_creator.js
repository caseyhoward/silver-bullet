var Wormhole = require('./wormhole');
var iframeOpener = require('./iframe_opener');

var WormholeCreator = function(iframeOpener) {
  this.open = function(origin) {
    // TODO: Refactor. parent comes out of nowhere.
    return Wormhole.create(parent, origin);
  };

  this.opening = function(sourceOrIframe) {
    if (typeof sourceOrIframe === 'string') {
      source = sourceOrIframe;
      iframe = iframeOpener.open(sourceOrIframe);
    } else {
      source = sourceOrIframe.src;
      iframe = sourceOrIframe;
    }
    return Wormhole.create(iframe.contentWindow, source);
  };
};

module.exports = new WormholeCreator(iframeOpener);
