var MessageReceiver = require('../src/message_receiver');
var eventListener = require('eventlistener');

describe('MessageReceiver', function() {
  var messageReceiver, callback;
  var origin = 'http://localhost:9876';

  afterEach(function() {
    messageReceiver.stopListening();
  });

  describe('#startListening', function() {
    it('listens to messages from the same origin', function(done) {
      callback = function(data) {
        expect(data).to.equal('{"abc": 123}');
        done();
      };
      messageReceiver = MessageReceiver.create(window, origin, callback);
      messageReceiver.startListening();
      window.postMessage('{"abc": 123}', origin);
    });

    it('listens to messages from the same origin and uses the deserializer', function(done) {
      callback = function(data) {
        expect(data).to.deep.equal({abc: 123});
        done();
      };
      messageReceiver = MessageReceiver.create(window, origin, callback, {deserialize: function(data) {
        return JSON.parse(data);
      }});
      messageReceiver.startListening();
      window.postMessage('{"abc": 123}', origin);
    });
  });

  describe('#stopListening', function() {
    it('stops listening', function(done) {
      callback = sinon.spy();
      messageReceiver = new MessageReceiver(window, origin, callback);
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
