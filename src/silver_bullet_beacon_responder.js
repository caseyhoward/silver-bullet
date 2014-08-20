var SilverBulletBeaconResponder = function(silverBulletMessageReceiver, silverBulletMessageSender) {
  var beaconReceived = function() {
    silverBulletMessageReceiver.off('beacon', beaconReceived);
    silverBulletMessageSender.sendReady();
  };
  silverBulletMessageReceiver.on('beacon', beaconReceived);
};

SilverBulletBeaconResponder.create = function(silverBulletBeaconResponder, SilverBulletMessageSender) {
  return new SilverBulletBeaconResponder(silverBulletBeaconResponder, SilverBulletMessageSender);
};

module.exports = SilverBulletBeaconResponder;
