var _ = require('lodash');
var MessagePoster = require('../src/message_poster.js');

describe('MessagePoster', function() {
  describe('postMessage', function() {
    var messagePoster, postMessageEventListener;

    afterEach(function() {
      window.removeEventListener('message', postMessageEventListener);
    });

    it('posts messages', function(done) {
      messagePoster = MessagePoster.create(window, '*');
      postMessageEventListener = function(event) {
        expect(event.data).to.equal('event data');
        done();
      };
      window.addEventListener('message', postMessageEventListener, false);
      messagePoster.postMessage('event data');
    });

    it('posts serialized messages', function(done) {
      var serialize = function(message) {
        return JSON.stringify(message);
      };
      messagePoster = MessagePoster.create(window, '*', {serialize: serialize});
      postMessageEventListener = function(event) {
        expect(event.data).to.equal('"event data"');
        done();
      };
      window.addEventListener('message', postMessageEventListener, false);
      messagePoster.postMessage('event data');
    });
  });
});
