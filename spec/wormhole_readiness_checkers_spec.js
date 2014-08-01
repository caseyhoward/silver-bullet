var Promise = require('es6-promise').Promise;
var EventEmitter = require('events').EventEmitter;
var WormholeReadinessChecker = require('../src/wormhole_readiness_checker');

describe('WormholeReadinessChecker', function() {
  var wormholeReadinessChecker, wormholeMessageReceiver, sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    wormholeMessageReceiver = new EventEmitter();
    wormholeReadinessChecker = new WormholeReadinessChecker(wormholeMessageReceiver);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('returns a promise that is resolved when the wormhole is ready', function(done) {
    var promise1 = wormholeReadinessChecker.whenReady().then(function() {});
    var promise2 = wormholeReadinessChecker.whenReady().then(function() {});
    Promise.all([promise1, promise2]).then(function() {
      done();
    });
    wormholeMessageReceiver.emit('ready');
  });
});
