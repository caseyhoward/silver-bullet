var wormhole = require('../../dist/wormhole');
var Promise = require('es6-promise').Promise;

describe('wormhole', function() {
  var testWormhole;

  beforeEach(function() {
    testWormhole = wormhole.opening('http://localhost:8080/spec/integration/assets/html/test.html');
  });

  afterEach(function() {
    testWormhole.destroy();
  });

  it('works', function(done) {
    var logInPromise = testWormhole.publish('log in').then(function(result) {
      expect(result).to.equal('successful log in');
    });
    var logOutPromise = testWormhole.publish('log out').then(function(result) {
      expect(result).to.equal('successful log out');
    });
    Promise.all([logInPromise, logOutPromise]).then(function() {
      done();
    });
  });
});
