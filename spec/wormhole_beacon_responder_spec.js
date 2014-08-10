var WormholeBeaconResponder = require('../src/wormhole_beacon_responder');
var EventEmitter = require('../src/event_emitter');

describe('WormholeBeaconResponder', function() {
  var wormholeBeaconResponder, wormholeMessageReceiver, wormholeMessageSender;

  beforeEach(function() {
    wormholeMessageSender = {sendReady: sinon.spy()};
    wormholeMessageReceiver = EventEmitter.create();
    wormholeBeaconResponder = WormholeBeaconResponder.create(wormholeMessageReceiver, wormholeMessageSender);
  });

  it('sends ready signal after receiving a beacon', function() {
    expect(wormholeMessageSender.sendReady.called).to.equal(false);
    wormholeMessageReceiver.emit('beacon');
    expect(wormholeMessageSender.sendReady.calledOnce).to.equal(true);
  });

  it('stops listening for beacons after receiving a beacon', function() {
    expect(wormholeMessageSender.sendReady.called).to.equal(false);
    wormholeMessageReceiver.emit('beacon');
    expect(wormholeMessageSender.sendReady.calledOnce).to.equal(true);
    wormholeMessageReceiver.emit('beacon');
    expect(wormholeMessageSender.sendReady.calledOnce).to.equal(true);
  });
});
