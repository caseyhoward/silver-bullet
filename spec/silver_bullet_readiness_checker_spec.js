var Promise = require('es6-promise').Promise;
var EventEmitter = require('events').EventEmitter;
var SilverBulletReadinessChecker = require('../src/silver_bullet_readiness_checker');

describe('SilverBulletReadinessChecker', function() {
  var silverBulletReadinessChecker, silverBulletMessageReceiver, sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    silverBulletMessageReceiver = new EventEmitter();
    silverBulletReadinessChecker = SilverBulletReadinessChecker.create(silverBulletMessageReceiver);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('returns a promise that is resolved when the silverBullet is ready', function(done) {
    var promise1 = silverBulletReadinessChecker.whenReady().then(function() {});
    var promise2 = silverBulletReadinessChecker.whenReady().then(function() {});
    Promise.all([promise1, promise2]).then(function() {
      done();
    });
    silverBulletMessageReceiver.emit('ready');
  });
});
