var SilverBullet = require('./silver_bullet');
var iframeOpener = require('./iframe_opener');

var SilverBulletCreator = function(iframeOpener) {
  this.open = function(origin) {
    // TODO: Refactor. parent comes out of nowhere.
    return SilverBullet.create(parent, origin);
  };

  this.opening = function(sourceOrIframe) {
    if (typeof sourceOrIframe === 'string') {
      source = sourceOrIframe;
      iframe = iframeOpener.open(sourceOrIframe);
    } else {
      source = sourceOrIframe.src;
      iframe = sourceOrIframe;
    }
    return SilverBullet.create(iframe.contentWindow, source);
  };
};

module.exports = new SilverBulletCreator(iframeOpener);
