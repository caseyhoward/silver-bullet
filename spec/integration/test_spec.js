var wormhole = require('../../dist/wormhole');

describe('wormhole', function() {
  var testWormhole;

  beforeEach(function() {
    testWormhole = wormhole.opening('http://localhost:8080/spec/integration/assets/html/test.html');
  });

  afterEach(function() {
    testWormhole.destroy();
  });

  it('works', function(done) {
    testWormhole.publish('log in').then(function(result) {
      expect(result).to.equal('success');
      done();
    });
  });
});
