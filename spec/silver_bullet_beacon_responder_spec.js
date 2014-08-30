var SilverBulletBeaconResponder = require('../src/silver_bullet_beacon_responder');
var EventEmitter = require('../src/event_emitter');

describe('SilverBulletBeaconResponder', function() {
  var silverBulletBeaconResponder, silverBulletMessageReceiver, silverBulletMessagePoster;

  beforeEach(function() {
    silverBulletMessagePoster = {sendReady: sinon.spy()};
    silverBulletMessageReceiver = EventEmitter.create();
    silverBulletBeaconResponder = SilverBulletBeaconResponder.create(silverBulletMessageReceiver, silverBulletMessagePoster);
  });

  it('sends ready signal after receiving a beacon', function() {
    expect(silverBulletMessagePoster.sendReady.called).to.equal(false);
    silverBulletMessageReceiver.emit('beacon');
    expect(silverBulletMessagePoster.sendReady.calledOnce).to.equal(true);
  });

  it('stops listening for beacons after receiving a beacon', function() {
    expect(silverBulletMessagePoster.sendReady.called).to.equal(false);
    silverBulletMessageReceiver.emit('beacon');
    expect(silverBulletMessagePoster.sendReady.calledOnce).to.equal(true);
    silverBulletMessageReceiver.emit('beacon');
    expect(silverBulletMessagePoster.sendReady.calledOnce).to.equal(true);
  });
});
