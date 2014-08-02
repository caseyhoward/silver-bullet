var WormholeMessagePublisher = require('../src/wormhole_message_publisher');
var uuidGenerator = require('../src/uuid_generator');
var EventEmitter = require('events').EventEmitter;
var Promise = require('es6-promise').Promise;

describe('WormholeMessagePublisher', function() {
  var wormholeMessagePublisher, wormholeMessageReceiver, pendingMessageQueue, uuid, sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    uuid = 0;
    sandbox.stub(uuidGenerator, 'generate', function() { uuid = uuid + 1; return uuid; });
    wormholeMessageReceiver = new EventEmitter();
    pendingMessageQueue = {push: sandbox.spy()};
    wormholeMessagePublisher = new WormholeMessagePublisher(wormholeMessageReceiver, pendingMessageQueue);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('push to the pendingMessageQueue', function() {
    wormholeMessagePublisher.push('some topic', {abc: 123});
    expect(pendingMessageQueue.push.getCall(0).args).to.deep.equal(['some topic', {abc: 123}, 1]);
  });

  it('returns a promise that gets resolved on a response with the correct uuid', function(done) {
    var promise1 = wormholeMessagePublisher.push('some topic', {abc: 123}).then(function(response) {
      expect(response).to.equal('some topic response');
      return 1;
    });
    var promise2 = wormholeMessagePublisher.push('some other topic', {def: 456}).then(function(response) {
      expect(response).to.equal('some other topic response');
      return 2;
    });
    Promise.all([promise1, promise2]).then(function(data) {
      expect(data).to.deep.equal([1, 2]);
      done();
    });
    wormholeMessageReceiver.emit('response', {uuid: 2, data: 'some other topic response'})
    wormholeMessageReceiver.emit('response', {uuid: 1, data: 'some topic response'})
  });
});
