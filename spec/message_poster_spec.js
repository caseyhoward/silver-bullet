var _ = require('lodash');

describe('MessagePoster', function() {
  var messagePoster;

  beforeEach(function() {
    MessagePoster = require('../src/message_poster.js');
    messagePoster = new MessagePoster();
  });

  describe('postMessage', function() {
    var postMessageEventListener, postMessageEventListenerWithDone;

    beforeEach(function() {
      postMessageEventListener = _.curry(function(done, event) {
        expect(event.data).to.equal('event data');
        done();
      });
    });

    afterEach(function() {
      window.removeEventListener('message', postMessageEventListenerWithDone, false);
    });

    it('posts messages', function(done) {
      postMessageEventListenerWithDone = postMessageEventListener(done);
      window.addEventListener('message', postMessageEventListenerWithDone, false);
      messagePoster.postMessage(window, 'event data', '*');
    });
  });
});
