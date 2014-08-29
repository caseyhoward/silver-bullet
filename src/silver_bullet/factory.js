var SilverBullet = require('./../silver_bullet');
var iframeOpener = require('./../iframe_opener');

var Factory = function(iframeOpener) {
  'use strict';
  // TODO: Refactor. parent comes out of nowhere.
  this.fromParent = function(origin) {
    return SilverBullet.create(parent, origin);
  };

  this.createIframe = function(source) {
    var iframe = iframeOpener.open(source);
    return SilverBullet.create(iframe.contentWindow, source);
  };

  this.fromIframe = function(iframe) {
    return SilverBullet.create(iframe.contentWindow, iframe.src);
  };
};

module.exports = new Factory(iframeOpener);
