var silverBullet = require('../src/silver_bullet_creator.js');
var SilverBullet = require('../src/silver_bullet.js');
var iframeOpener = require('../src/iframe_opener');

describe('SilverBulletCreator', function() {
  var testSilverBullet, iframe, sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    iframe = {contentWindow: 'contentWindow'};
    testSilverBullet = 'testSilverBullet';
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#fromParent', function() {
    beforeEach(function() {
      sandbox.stub(SilverBullet, 'create').withArgs(parent, 'http://origin.host').returns(testSilverBullet);
    });

    it('creates a silverBullet', function() {
      expect(silverBullet.fromParent('http://origin.host')).to.equal(testSilverBullet);
    });
  });

  describe('#createIframe', function() {
    beforeEach(function() {
      sandbox.stub(SilverBullet, 'create').withArgs(iframe.contentWindow, 'http://origin.host').returns(testSilverBullet);
    });

    it('creates a silverBullet', function() {
      sandbox.stub(iframeOpener, 'open').withArgs('http://origin.host').returns(iframe);
      expect(silverBullet.createIframe('http://origin.host')).to.equal(testSilverBullet);
    });
  });

  describe('#fromIframe', function() {
    beforeEach(function() {
      sandbox.stub(SilverBullet, 'create').withArgs(iframe.contentWindow, 'http://origin.host').returns(testSilverBullet);
    });

    it('creates a silverBullet', function() {
      iframe.src = 'http://origin.host';
      expect(silverBullet.fromIframe(iframe)).to.equal(testSilverBullet);
    });
  });
});
