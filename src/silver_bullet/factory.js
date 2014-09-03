var SilverBullet = require('../silver_bullet');
var iframeOpener = require('../iframe_opener');
var SilverBulletMessagePoster = require('../silver_bullet/message_poster');
var SilverBulletReadinessChecker = require('../silver_bullet_readiness_checker');
var SilverBulletMessageReceiver = require('../silver_bullet_message_receiver');
var liteUrl = require('lite-url');

var Factory = function(iframeOpener) {
  'use strict';

  var create = function(targetWindow, url) {
    var origin = liteUrl(url).origin;
    // TODO: Inject MessagePoster into SilverBulletMessagePoster
    var silverBulletMessagePoster = SilverBulletMessagePoster.create(targetWindow, origin);
    // TODO: Refactor. window comes out of nowhere.
    var silverBulletMessageReceiver = SilverBulletMessageReceiver.create(window, origin);
    var silverBulletReadinessChecker = SilverBulletReadinessChecker.create(silverBulletMessageReceiver);
    return SilverBullet.create(silverBulletMessagePoster, silverBulletMessageReceiver, silverBulletReadinessChecker);
  }

  // TODO: Refactor. parent comes out of nowhere.
  this.fromParent = function(origin) {
    return create(parent, origin);
  };

  this.createIframe = function(source) {
    var iframe = iframeOpener.open(source);
    return create(iframe.contentWindow, source);
  };

  this.fromIframe = function(iframe) {
    return create(iframe.contentWindow, iframe.src);
  };
};

module.exports = new Factory(iframeOpener);
