var WormholeBeaconSender = require('../src/wormhole_beacon_sender');
var Promise = require('es6-promise').Promise;

describe.only('WormholeBeaconSender', function() {
  var wormholeBeaconSender, wormholeMessageSender, wormholeReadinessChecker;
  var readinessPromise, readinessResolve, test, sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    sandbox.useFakeTimers();
    readinessPromise = new Promise(function(resolve) {
      readinessResolve = resolve;
    });
    wormholeReadinessChecker = {whenReady: sandbox.stub().returns(readinessPromise)};
    wormholeMessageSender = {sendBeacon: sinon.spy()};
    wormholeBeaconSender = new WormholeBeaconSender(wormholeMessageSender, wormholeReadinessChecker, setTimeout);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('sends a beacon', function() {
    wormholeBeaconSender.start();
    expect(wormholeMessageSender.sendBeacon.withArgs().called).to.be.true;
  });

  it('sends a beacon every 100ms', function() {
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(0);
    wormholeBeaconSender.start();
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(1);
    sandbox.clock.tick(100);
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(2);
    sandbox.clock.tick(100);
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(3);
    sandbox.clock.tick(100);
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(4);
  });

  it('stops sending when wormhole is ready', function(done) {
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(0);
    wormholeBeaconSender.start();
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(1);
    sandbox.clock.tick(100);
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(2);
    sandbox.clock.tick(100);
    expect(wormholeMessageSender.sendBeacon.withArgs().callCount).to.equal(3);
    readinessPromise.then(function() {
      sandbox.clock.tick(1000);
      done();
    });
    readinessResolve();
    sandbox.clock.tick(1); // We have to do this in phantom or the callback never gets resolved
  });
});
