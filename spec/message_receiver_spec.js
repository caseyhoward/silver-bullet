var MessageReceiver = require('../src/message_receiver');
var eventListener = require('eventlistener');

describe('MessageReceiver', function() {
  var callback;

  afterEach(function() {
    eventListener.remove(window, 'message', callback);
  });

  describe('#startListening', function() {
    it('listens to messages from the same origin', function(done) {
      var origin = 'http://localhost:9876';
      var callback = function(data) {
        expect(data).to.deep.equal({abc: 123});
        done();
      };
      var messageReceiver = new MessageReceiver(window, origin, callback);
      messageReceiver.startListening();
      window.postMessage('{"abc": 123}', origin);
    });
  });

  describe('#stopListening', function() {
    it('stops listening', function(done) {
      var origin = 'http://localhost:9876';
      var callback = sinon.spy();
      var messageReceiver = new MessageReceiver(window, origin, callback);
      messageReceiver.startListening();
      messageReceiver.stopListening();
      window.postMessage('{"abc": 123}', origin);
      setTimeout(function() {
        expect(callback.called).to.equal(false);
        done();
      }, 0);
    });
  });
});
