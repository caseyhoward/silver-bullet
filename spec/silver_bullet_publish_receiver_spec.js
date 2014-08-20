var SilverBulletPublishReceiver = require('../src/silver_bullet_publish_receiver.js');
var EventEmitter = require('../src/event_emitter.js');

describe('SilverBulletPublishReceiver', function() {
  var sandbox, silverBulletPublishReceiver, silverBulletMessageReceiver, silverBulletMessageSender;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    silverBulletMessageReceiver = EventEmitter.create();
    silverBulletMessageSender = {resolve: sandbox.spy(), reject: sandbox.spy()};
    silverBulletPublishReceiver = new SilverBulletPublishReceiver(silverBulletMessageReceiver, silverBulletMessageSender);
  });

  afterEach(function() {
    sandbox.restore();
  });

  describe('#subscribe', function() {
    it('subscribes to publish events', function(done) {
      var badCallback = sandbox.spy();
      silverBulletPublishReceiver.subscribe('test 2', badCallback);
      silverBulletPublishReceiver.subscribe('test', function (data) {
        expect(badCallback.called).to.equal(false);
        expect(data).to.deep.equal({abc: 123});
        done();
      });
      silverBulletMessageReceiver.emit('publish', {topic: 'test', data: {abc: 123}});
    });

    it('subscribes to publish events and resolves', function(done) {
      silverBulletPublishReceiver.subscribe('test', function (data, resolve) {
        resolve('response');
        called = silverBulletMessageSender.resolve.calledWith('test', 'response', 'some uuid');
        expect(called).to.equal(true);
        done();
      });
      silverBulletMessageReceiver.emit('publish', {topic: 'test', data: {abc: 123}, uuid: 'some uuid'});
    });

    it('subscribes to publish events and rejects', function(done) {
      silverBulletPublishReceiver.subscribe('test', function (data, resolve, reject) {
        reject('error!!!');
        called = silverBulletMessageSender.reject.calledWith('test', 'error!!!', 'some uuid');
        expect(called).to.equal(true);
        done();
      });
      silverBulletMessageReceiver.emit('publish', {topic: 'test', data: {abc: 123}, uuid: 'some uuid'});
    });
  });
});

