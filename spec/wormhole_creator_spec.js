var wormhole = require('../src/wormhole_creator.js');
var Wormhole = require('../src/wormhole.js');
var iframeOpener = require('../src/iframe_opener');

describe('WormholeCreator', function() {
  var testWormhole, iframe, sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    iframe = {contentWindow: 'contentWindow'};
    testWormhole = 'testWormhole';
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#open', function() {
    beforeEach(function() {
      sandbox.stub(Wormhole, 'create').withArgs(parent, 'http://origin.host').returns(testWormhole);
    });

    it('creates a wormhole', function() {
      expect(wormhole.open('http://origin.host')).to.equal(testWormhole);
    });
  });

  describe('#opening', function() {
    beforeEach(function() {
      sandbox.stub(Wormhole, 'create').withArgs(iframe.contentWindow, 'http://origin.host').returns(testWormhole);
    });

    describe('with a source', function() {
      it('creates a wormhole', function() {
        sandbox.stub(iframeOpener, 'open').withArgs('http://origin.host').returns(iframe);
        expect(wormhole.opening('http://origin.host')).to.equal(testWormhole);
      });
    });

    describe('with an iframe', function() {
      it('creates a wormhole', function() {
        iframe.src = 'http://origin.host';
        expect(wormhole.opening(iframe)).to.equal(testWormhole);
      });
    });
  });
});
