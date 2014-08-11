var WormholePublishReceiver = require('../src/wormhole_publish_receiver.js');
var EventEmitter = require('../src/event_emitter.js');

describe('WormholePublishReceiver', function() {
  var sandbox, wormholePublishReceiver, wormholeMessageReceiver, wormholeMessageSender;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    wormholeMessageReceiver = EventEmitter.create();
    wormholeMessageSender = {respond: sandbox.spy()};
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

    it('subscribes to publish events and responds', function(done) {
      wormholePublishReceiver.subscribe('test', function (data, respond) {
        respond('response');
        called = wormholeMessageSender.respond.calledWith('test', 'response', 'some uuid');
        expect(called).to.equal(true);
        done();
      });
      wormholeMessageReceiver.emit('publish', {topic: 'test', data: {abc: 123}, uuid: 'some uuid'});
    });
  });
});

