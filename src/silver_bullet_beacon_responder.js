var SilverBulletBeaconResponder = function(silverBulletMessageReceiver, silverBulletMessagePoster) {
  var beaconReceived = function() {
    silverBulletMessageReceiver.off('beacon', beaconReceived);
    silverBulletMessagePoster.sendReady();
  };
  silverBulletMessageReceiver.on('beacon', beaconReceived);
};

SilverBulletBeaconResponder.create = function(silverBulletBeaconResponder, silverBulletMessagePoster) {
  return new SilverBulletBeaconResponder(silverBulletBeaconResponder, silverBulletMessagePoster);
};

module.exports = SilverBulletBeaconResponder;
