var silverBullet = require('../../src/silver_bullet/factory.js');
var SilverBullet = require('../../src/silver_bullet.js');
var iframeOpener = require('../../src/iframe_opener');
var SilverBulletMessagePoster = require('../../src/silver_bullet/message_poster');
var SilverBulletMessageReceiver = require('../../src/silver_bullet_message_receiver');

describe('Factory', function() {
  var testSilverBullet, iframe, sandbox;
  var silverBulletMessagePoster, silverBulletMessageReceiver;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    iframe = {contentWindow: 'contentWindow'};
    silverBulletMessagePoster = 'poster';
    silverBulletMessageReceiver = 'receiver';
    testSilverBullet = 'testSilverBullet';
    sandbox.stub(SilverBullet, 'create').withArgs(silverBulletMessagePoster, silverBulletMessageReceiver).returns(testSilverBullet);
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#fromParent', function() {
    beforeEach(function() {
      sandbox.stub(SilverBulletMessagePoster, 'create').withArgs(parent, 'http://origin.host').returns(silverBulletMessagePoster);
      sandbox.stub(SilverBulletMessageReceiver, 'create').withArgs(window, 'http://origin.host').returns(silverBulletMessageReceiver);
    });

    it('creates a silverBullet', function() {
      expect(silverBullet.fromParent('http://origin.host')).to.equal(testSilverBullet);
    });
  });

  describe('#createIframe', function() {
    beforeEach(function() {
      sandbox.stub(SilverBulletMessagePoster, 'create').withArgs(iframe.contentWindow, 'http://origin.host').returns(silverBulletMessagePoster);
      sandbox.stub(SilverBulletMessageReceiver, 'create').withArgs(window, 'http://origin.host').returns(silverBulletMessageReceiver);
    });

    it('creates a silverBullet', function() {
      sandbox.stub(iframeOpener, 'open').withArgs('http://origin.host').returns(iframe);
      expect(silverBullet.createIframe('http://origin.host')).to.equal(testSilverBullet);
    });
  });

  describe('#fromIframe', function() {
    beforeEach(function() {
      sandbox.stub(SilverBulletMessagePoster, 'create').withArgs(iframe.contentWindow, 'http://origin.host').returns(silverBulletMessagePoster);
      sandbox.stub(SilverBulletMessageReceiver, 'create').withArgs(window, 'http://origin.host').returns(silverBulletMessageReceiver);
    });

    it('creates a silverBullet', function() {
      iframe.src = 'http://origin.host';
      expect(silverBullet.fromIframe(iframe)).to.equal(testSilverBullet);
    });
  });
});
