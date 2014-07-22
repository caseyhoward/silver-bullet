var iframeOpener = require('../src/iframe_opener');

describe('IframeOpener', function() {
  afterEach(function() {
    var iframe = document.getElementById('test-iframe');
    iframe.parentNode.removeChild(iframe);
  });

  it('opens an iframe', function() {
    iframeOpener.open('about:blank', {id: "test-iframe"});
    var iframe = document.getElementById('test-iframe');
    expect(iframe.src).to.equal('about:blank');
  });

  it('opens an with all options passed in', function() {
    iframeOpener.open('about:blank', {id: 'test-iframe', className: 'blah'});
    var iframe = document.getElementById('test-iframe');
    expect(iframe.src).to.equal('about:blank');
    expect(iframe.className).to.equal('blah');
  });
});
