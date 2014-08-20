var SilverBulletBeaconResponder = require('../src/silver_bullet_beacon_responder');
var EventEmitter = require('../src/event_emitter');

describe('SilverBulletBeaconResponder', function() {
  var silverBulletBeaconResponder, silverBulletMessageReceiver, silverBulletMessageSender;

  beforeEach(function() {
    silverBulletMessageSender = {sendReady: sinon.spy()};
    silverBulletMessageReceiver = EventEmitter.create();
    silverBulletBeaconResponder = SilverBulletBeaconResponder.create(silverBulletMessageReceiver, silverBulletMessageSender);
  });

  it('sends ready signal after receiving a beacon', function() {
    expect(silverBulletMessageSender.sendReady.called).to.equal(false);
    silverBulletMessageReceiver.emit('beacon');
    expect(silverBulletMessageSender.sendReady.calledOnce).to.equal(true);
  });

  it('stops listening for beacons after receiving a beacon', function() {
    expect(silverBulletMessageSender.sendReady.called).to.equal(false);
    silverBulletMessageReceiver.emit('beacon');
    expect(silverBulletMessageSender.sendReady.calledOnce).to.equal(true);
    silverBulletMessageReceiver.emit('beacon');
    expect(silverBulletMessageSender.sendReady.calledOnce).to.equal(true);
  });
});
