var wormhole = require('../../dist/wormhole');
var Promise = require('es6-promise').Promise;

describe('wormhole', function() {
  var testWormhole;

  afterEach(function() {
    testWormhole.destroy();
  });

  it('works without an iframe', function(done) {
    testWormhole = wormhole.opening('http://localhost:8080/spec/integration/assets/html/test.html');
    var logInPromise = testWormhole.emit('log in').then(function(result) {
      expect(result).to.equal('successful log in');
    });
    var logInPromise = testWormhole.emit('log in', {username: 'bad'}).catch(function(error) {
      expect(error).to.equal('bad username');
    });
    var logOutPromise = testWormhole.emit('log out').then(function(result) {
      expect(result).to.equal('successful log out');
    });

    Promise.all([logInPromise, logOutPromise]).then(function() {
      testWormhole.destroy();
      done();
    });
  });

  it('works with an iframe', function(done) {
    var iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:8080/spec/integration/assets/html/test.html';
    document.body.appendChild(iframe);
    testWormhole = wormhole.opening(iframe);
    var logInPromise = testWormhole.emit('log in').then(function(result) {
      expect(result).to.equal('successful log in');
    });
    var logOutPromise = testWormhole.emit('log out').then(function(result) {
      expect(result).to.equal('successful log out');
    });
    Promise.all([logInPromise, logOutPromise]).then(function() {
      testWormhole.destroy();
      iframe.parentNode.removeChild(iframe);
      done();
    });
  });
});
