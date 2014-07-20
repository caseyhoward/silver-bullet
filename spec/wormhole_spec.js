var wormhole = require('../src/wormhole.js');
var iframeOpener = require('../src/iframe_opener');

describe('Wormhole', function() {
  var testWormhole, iframe;

  beforeEach(function() {
    iframe = sinon.spy();
  });

  it('opens an iframe', function() {
    var expectation = sinon.mock(iframeOpener).expects('open').withArgs('about:blank').returns(iframe);
    wormhole.open('about:blank');
    expectation.verify();
  });
});
