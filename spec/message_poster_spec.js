var _ = require('lodash');
var MessagePoster = require('../src/message_poster.js');

describe('MessagePoster', function() {
  describe('postMessage', function() {
    var messagePoster, postMessageEventListener, postMessageEventListenerWithDone;

    beforeEach(function() {
      messagePoster = MessagePoster.create(window, '*');
      postMessageEventListener = _.curry(function(done, event) {
        expect(event.data).to.equal('"event data"');
        done();
      });
    });

    afterEach(function() {
      window.removeEventListener('message', postMessageEventListenerWithDone, false);
    });

    it('posts messages', function(done) {
      postMessageEventListenerWithDone = postMessageEventListener(done);
      window.addEventListener('message', postMessageEventListenerWithDone, false);
      messagePoster.postMessage('event data');
    });
  });
});
