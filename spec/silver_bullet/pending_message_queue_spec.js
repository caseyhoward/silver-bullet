var PendingMessageQueue = require('../../src/silver_bullet/pending_message_queue');
var Promise = require('es6-promise').Promise;

describe('PendingMessageQueue', function() {
  var pendingMessageQueue, silverBulletMessagePoster, silverBulletReadinessChecker, readinessPromise, readinessPromiseResolve;

  beforeEach(function() {
    var sandbox = sinon.sandbox.create();
    readinessPromise = new Promise(function(resolve, reject) {
      readinessPromiseResolve = resolve;
    });
    silverBulletMessagePoster = {publish: sinon.spy()};
    silverBulletReadinessChecker = {whenReady: function() { return readinessPromise; } };
    pendingMessageQueue = new PendingMessageQueue(silverBulletMessagePoster, silverBulletReadinessChecker);
  });

  describe('#push', function() {
    it('sends messages when ready', function(done) {
      pendingMessageQueue.push('some topic', 'some data', 'some uuid');
      expect(silverBulletMessagePoster.publish.calledWith('some topic', 'some data', 'some uuid')).to.equal(false);
      readinessPromise.then(function() {
        expect(silverBulletMessagePoster.publish.calledWith('some topic', 'some data', 'some uuid')).to.equal(true);
        done();
      });
      readinessPromiseResolve();
    });

    it('sends messages in the same order they were queued', function() {
      pendingMessageQueue.push('some topic', 'some data', 'some uuid');
      expect(silverBulletMessagePoster.publish.calledWith('some topic', 'some data', 'some uuid')).to.equal(false);
      expect(silverBulletMessagePoster.publish.calledWith('some other topic', 'some other data', 'some other uuid')).to.equal(false);
      readinessPromiseResolve();
      readinessPromise.then(function() {
        expect(silverBulletMessagePoster.publish.getCall(0).args).to.deep.equal(['some topic', 'some data', 'some uuid']);
        expect(silverBulletMessagePoster.publish.getCall(1).args).to.deep.equal(['some other topic', 'some other data', 'some other uuid']);
        done();
      });
    });
  });
});

