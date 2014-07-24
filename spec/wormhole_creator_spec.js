var wormhole = require('../src/wormhole_creator.js');
var iframeOpener = require('../src/iframe_opener');

describe('Wormhole', function() {
  var testWormhole, iframe;

  beforeEach(function() {
    iframe = sinon.spy();
  });

  afterEach(function() {
    testWormhole.destroy();
  });

  describe('#opening', function() {
    it('opens an iframe', function() {
      var expectation = sinon.mock(iframeOpener).expects('open').withArgs('about:blank').returns(iframe);
      testWormhole = wormhole.opening('about:blank');
      expectation.verify();
    });
  });
});
