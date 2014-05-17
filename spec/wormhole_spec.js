describe('Wormhole', function() {
  var wormhole = require('../src/wormhole.js');
  var testWormhole = wormhole.open('about:blank');
  var iframeOpener = require('../src/iframe_opener');
  var iframe = sinon.spy();

  it('opens an iframe', function() {
    sinon.mock(iframeOpener).expects('open').withArgs('about:blank').returns(iframe);
    wormhole.open('about:blank');
  });
});
