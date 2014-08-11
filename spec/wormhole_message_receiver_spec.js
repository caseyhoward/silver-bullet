var WormholeMessageReceiver = require('../src/wormhole_message_receiver.js');
var MessageReceiver = require('../src/message_receiver.js');
var wormholeMessageParser = require('../src/wormhole_message_parser.js');
var EventEmitter = require('../src/event_emitter.js');

describe('WormholeMessageReceiver', function() {
  var sandbox, wormholeMessageReceiver, wormholeMessageSender, messageReceiver, receivedMessage;

  beforeEach(function() {
    messageReceiver = {startListening: sinon.spy(), stopListening: sinon.spy()};
    sandbox = sinon.sandbox.create();
    // TODO: Find out why the following doesn't work
    // sandbox.stub(MessageReceiver, 'create').withArgs('some window', 'some origin', sinon.match.func).returns(messageReceiver);
    sandbox.stub(MessageReceiver, 'create').returns(messageReceiver);
    sandbox.stub(wormholeMessageParser, 'parse', function(value) {
      value.wasParsed = true;
      return value;
    });
    wormholeMessageReceiver = new WormholeMessageReceiver('some window', 'some origin');
    receivedMessage = MessageReceiver.create.getCall(0).args[2];
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#on', function() {
    it('receives parsed messages', function(done) {
      wormholeMessageReceiver.on('blah', function(data) {
        expect(data.data).to.equal('some data');
        expect(data.wasParsed).to.equal(true);
        done();
      });
      receivedMessage({type: 'blah', data: 'some data'});
    });

    it('does not emit an event if there is no data', function(done) {
      var callback = sinon.spy();
      wormholeMessageReceiver.on('blah',  callback);
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
      wormholeMessageReceiver.on('blah',  callback);
      wormholeMessageReceiver.off('blah',  callback);
      receivedMessage({type: 'blah', data: 'some data'});
      setTimeout(function() {
        expect(callback.called).to.equal(false);
        done();
      }, 0);
    });
  });

  describe('#startListening', function() {
    it('starts listening for messages', function() {
      wormholeMessageReceiver.startListening();
      expect(messageReceiver.startListening.called).to.equal(true);
    });
  });

  describe('#stopListening', function() {
    it('starts listening for messages', function() {
      wormholeMessageReceiver.stopListening();
      expect(messageReceiver.stopListening.called).to.equal(true);
    });
  });
});

