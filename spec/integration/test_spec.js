var wormhole = require('../../dist/wormhole');

describe('wormhole', function() {
  var testWormhole;

  beforeEach(function() {
    testWormhole = wormhole.opening('http://localhost:8080/spec/integration/assets/html/test.html');
  });

  it('works', function(done) {
    testWormhole.publish('log in').then(function(result) {
      console.log('here');
      expect(result).to.equal('success');
      done();
    });
  });
});
