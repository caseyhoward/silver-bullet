var silverBullet = require('../../dist/silver_bullet');
var Promise = require('es6-promise').Promise;

describe('silverBullet', function() {
  var testSilverBullet;

  afterEach(function() {
    testSilverBullet.destroy();
  });

  it('works without an iframe', function(done) {
    testSilverBullet = silverBullet.createIframe('http://localhost:8080/spec/integration/assets/html/test.html');
    var logInPromise = testSilverBullet.emit('log in').then(function(result) {
      expect(result).to.equal('successful log in');
    });
    var logInPromise = testSilverBullet.emit('log in', {username: 'bad'}).catch(function(error) {
      expect(error).to.equal('bad username');
    });
    var logOutPromise = testSilverBullet.emit('log out').then(function(result) {
      expect(result).to.equal('successful log out');
    });

    Promise.all([logInPromise, logOutPromise]).then(function() {
      testSilverBullet.destroy();
      done();
    });
  });

  it('works with an iframe', function(done) {
    var iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:8080/spec/integration/assets/html/test.html';
    document.body.appendChild(iframe);
    testSilverBullet = silverBullet.fromIframe(iframe);
    var logInPromise = testSilverBullet.emit('log in').then(function(result) {
      expect(result).to.equal('successful log in');
    });
    var logOutPromise = testSilverBullet.emit('log out').then(function(result) {
      expect(result).to.equal('successful log out');
    });
    Promise.all([logInPromise, logOutPromise]).then(function() {
      testSilverBullet.destroy();
      iframe.parentNode.removeChild(iframe);
      done();
    });
  });

  it('works with rejection', function(done) {
    testSilverBullet = silverBullet.createIframe('http://localhost:8080/spec/integration/assets/html/test.html');
    var handleError = function(error) {
      expect(error).to.equal('some error');
      testSilverBullet.destroy();
      done();
    }
    testSilverBullet.emit('blow up').catch(handleError);
  });
});
