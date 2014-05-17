describe('MessagePoster', function() {
  var messagePoster;

  beforeEach(function() {
    MessagePoster = require('../src/message_poster.js');
    messagePoster = new MessagePoster();
  });

  describe('postMessage', function() {
    it('posts messages', function(done) {
      window.addEventListener('message', function(event) {
        expect(event.data).to.equal('event data');
        done();
      }, false);
      messagePoster.postMessage(window, 'event data', '*');
    });
  });
});
