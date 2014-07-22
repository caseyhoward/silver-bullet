var wormhole = require('../src/wormhole.js');
var iframeOpener = require('../src/iframe_opener');

describe('Wormhole', function() {
  var testWormhole, iframe;

  beforeEach(function() {
    iframe = sinon.spy();
  });

  describe('#opening', function() {
    it('opens an iframe', function() {
      var expectation = sinon.mock(iframeOpener).expects('open').withArgs('about:blank').returns(iframe);
      wormhole.opening('about:blank');
      expectation.verify();
    });
  });
});
