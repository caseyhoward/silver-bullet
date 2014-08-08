var PendingMessageQueue = require('../src/pending_message_queue');
var Promise = require('es6-promise').Promise;

describe('PendingMessageQueue', function() {
  var pendingMessageQueue, wormholeMessageSender, wormholeReadinessChecker, readinessPromise, readinessPromiseResolve;

  beforeEach(function() {
    var sandbox = sinon.sandbox.create();
    readinessPromise = new Promise(function(resolve, reject) {
      readinessPromiseResolve = resolve;
    });
    wormholeMessageSender = {publish: sinon.spy()};
    wormholeReadinessChecker = {whenReady: function() { return readinessPromise; } };
    pendingMessageQueue = new PendingMessageQueue(wormholeMessageSender, wormholeReadinessChecker);
  });

  describe('#push', function() {
    it('sends messages when ready', function(done) {
      pendingMessageQueue.push('some topic', 'some data', 'some uuid');
      expect(wormholeMessageSender.publish.calledWith('some topic', 'some data', 'some uuid')).to.equal(false);
      readinessPromise.then(function() {
        expect(wormholeMessageSender.publish.calledWith('some topic', 'some data', 'some uuid')).to.equal(true);
        done();
      });
      readinessPromiseResolve();
    });

    it('sends messages in the same order they were queued', function() {
      pendingMessageQueue.push('some topic', 'some data', 'some uuid');
      expect(wormholeMessageSender.publish.calledWith('some topic', 'some data', 'some uuid')).to.equal(false);
      expect(wormholeMessageSender.publish.calledWith('some other topic', 'some other data', 'some other uuid')).to.equal(false);
      readinessPromiseResolve();
      readinessPromise.then(function() {
        expect(wormholeMessageSender.publish.getCall(0).args).to.deep.equal(['some topic', 'some data', 'some uuid']);
        expect(wormholeMessageSender.publish.getCall(1).args).to.deep.equal(['some other topic', 'some other data', 'some other uuid']);
        done();
      });
    });
  });
});

