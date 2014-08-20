var SilverBulletMessagePublisher = require('../src/silver_bullet_message_publisher');
var uuidGenerator = require('../src/uuid_generator');
var EventEmitter = require('events').EventEmitter;
var Promise = require('es6-promise').Promise;

describe('SilverBulletMessagePublisher', function() {
  var silverBulletMessagePublisher, silverBulletMessageReceiver, pendingMessageQueue, uuid, sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    uuid = 0;
    sandbox.stub(uuidGenerator, 'generate', function() { uuid = uuid + 1; return uuid; });
    silverBulletMessageReceiver = new EventEmitter();
    pendingMessageQueue = {push: sandbox.spy()};
    silverBulletMessagePublisher = new SilverBulletMessagePublisher(silverBulletMessageReceiver, pendingMessageQueue);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('push to the pendingMessageQueue', function() {
    silverBulletMessagePublisher.push('some topic', {abc: 123});
    expect(pendingMessageQueue.push.getCall(0).args).to.deep.equal(['some topic', {abc: 123}, 1]);
  });

  it('returns a promise that gets resolved on a response with the correct uuid', function(done) {
    var promise1 = silverBulletMessagePublisher.push('some topic', {abc: 123}).then(function(response) {
      expect(response).to.equal('some topic response');
      return 1;
    });
    var promise2 = silverBulletMessagePublisher.push('some other topic', {def: 456}).then(function(response) {
      expect(response).to.equal('some other topic response');
      return 2;
    });
    Promise.all([promise1, promise2]).then(function(data) {
      expect(data).to.deep.equal([1, 2]);
      done();
    });
    silverBulletMessageReceiver.emit('response', {uuid: 2, data: 'some other topic response'});
    silverBulletMessageReceiver.emit('response', {uuid: 1, data: 'some topic response'});
  });

  it('returns a promise that gets rejected on a rejection with the correct uuid', function(done) {
    var promise1 = silverBulletMessagePublisher.push('some topic', {abc: 123}).catch(function(response) {
      expect(response).to.equal('some topic rejection');
      return 1;
    });
    var promise2 = silverBulletMessagePublisher.push('some other topic', {def: 456}).catch(function(response) {
      expect(response).to.equal('some other topic rejection');
      return 2;
    });
    Promise.all([promise1, promise2]).then(function(data) {
      expect(data).to.deep.equal([1, 2]);
      done();
    });
    silverBulletMessageReceiver.emit('rejection', {uuid: 2, data: 'some other topic rejection'});
    silverBulletMessageReceiver.emit('rejection', {uuid: 1, data: 'some topic rejection'});
  });
});
