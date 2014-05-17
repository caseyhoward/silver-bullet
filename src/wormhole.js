var iframeOpener = require('./iframe_opener');

var WormholeCreator = function(iframeOpener) {
  this.open = function(source) {
    iframeOpener.open(source);
  };
  this.opening = function(origin) {
  };
};

module.exports = new WormholeCreator(iframeOpener);
