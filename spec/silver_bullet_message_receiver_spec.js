var SilverBulletMessageReceiver = require('../src/silver_bullet_message_receiver.js');
var MessageReceiver = require('../src/message_receiver.js');
var deserializer = require('../src/silver_bullet/deserializer.js');
var EventEmitter = require('../src/event_emitter.js');

describe('SilverBulletMessageReceiver', function() {
  var sandbox, silverBulletMessageReceiver, silverBulletMessagePoster, messageReceiver, receivedMessage;

  beforeEach(function() {
    messageReceiver = {startListening: sinon.spy(), stopListening: sinon.spy()};
    sandbox = sinon.sandbox.create();
    // TODO: Find out why the following doesn't work
    sandbox.stub(MessageReceiver, 'create').withArgs(
      'some window',
      'some origin',
      sinon.match.func,
      sinon.match({deserialize: deserializer.deserialize})
    ).returns(messageReceiver);
    silverBulletMessageReceiver = SilverBulletMessageReceiver.create('some window', 'some origin');
    receivedMessage = MessageReceiver.create.getCall(0).args[2];
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#on', function() {
    it('receives parsed messages', function(done) {
      silverBulletMessageReceiver.on('blah', function(data) {
        expect(data.data).to.equal('some data');
        done();
      });
      receivedMessage({type: 'blah', data: 'some data'});
    });

    it('does not emit an event if there is no data', function(done) {
      var callback = sinon.spy();
      silverBulletMessageReceiver.on('blah',  callback);
      receivedMessage();
      setTimeout(function() {
        expect(callback.called).to.equal(false);
        done();
      }, 0);
    });
  });

  describe('#off', function() {
    it('stops receiving messages', function(done) {
      var callback = sinon.spy();
      silverBulletMessageReceiver.on('blah',  callback);
      silverBulletMessageReceiver.off('blah',  callback);
      receivedMessage({type: 'blah', data: 'some data'});
      setTimeout(function() {
        expect(callback.called).to.equal(false);
        done();
      }, 0);
    });
  });

  describe('#startListening', function() {
    it('starts listening for messages', function() {
      silverBulletMessageReceiver.startListening();
      expect(messageReceiver.startListening.called).to.equal(true);
    });
  });

  describe('#stopListening', function() {
    it('starts listening for messages', function() {
      silverBulletMessageReceiver.stopListening();
      expect(messageReceiver.stopListening.called).to.equal(true);
    });
  });
});

