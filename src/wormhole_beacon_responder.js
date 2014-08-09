var WormholeBeaconResponder = function(wormholeMessageReceiver, wormholeMessageSender) {
  var beaconReceived = function() {
    wormholeMessageReceiver.off('beacon', beaconReceived);
    wormholeMessageSender.sendReady();
  };
  wormholeMessageReceiver.on('beacon', beaconReceived);
};

WormholeBeaconResponder.create = function(wormholeBeaconResponder, WormholeMessageSender) {
  return new WormholeBeaconResponder(wormholeBeaconResponder, WormholeMessageSender);
};

module.exports = WormholeBeaconResponder;
