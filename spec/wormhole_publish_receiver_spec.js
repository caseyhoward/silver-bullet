var WormholePublishReceiver = require('../src/wormhole_publish_receiver.js');
var EventEmitter = require('../src/event_emitter.js');

describe('WormholePublishReceiver', function() {
  var sandbox, wormholePublishReceiver, wormholeMessageReceiver, wormholeMessageSender;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    wormholeMessageReceiver = EventEmitter.create();
    wormholeMessageSender = {resolve: sandbox.spy(), reject: sandbox.spy()};
    wormholePublishReceiver = new WormholePublishReceiver(wormholeMessageReceiver, wormholeMessageSender);
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#subscribe', function() {
    it('subscribes to publish events', function(done) {
      var badCallback = sandbox.spy();
      wormholePublishReceiver.subscribe('test 2', badCallback);
      wormholePublishReceiver.subscribe('test', function (data) {
        expect(badCallback.called).to.equal(false);
        expect(data).to.deep.equal({abc: 123});
        done();
      });
      wormholeMessageReceiver.emit('publish', {topic: 'test', data: {abc: 123}});
    });

    it('subscribes to publish events and resolves', function(done) {
      wormholePublishReceiver.subscribe('test', function (data, resolve) {
        resolve('response');
        called = wormholeMessageSender.resolve.calledWith('test', 'response', 'some uuid');
        expect(called).to.equal(true);
        done();
      });
      wormholeMessageReceiver.emit('publish', {topic: 'test', data: {abc: 123}, uuid: 'some uuid'});
    });

    it('subscribes to publish events and rejects', function(done) {
      wormholePublishReceiver.subscribe('test', function (data, resolve, reject) {
        reject('error!!!');
        called = wormholeMessageSender.reject.calledWith('test', 'error!!!', 'some uuid');
        expect(called).to.equal(true);
        done();
      });
      wormholeMessageReceiver.emit('publish', {topic: 'test', data: {abc: 123}, uuid: 'some uuid'});
    });
  });
});

