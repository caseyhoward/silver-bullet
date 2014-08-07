var WormholeBeaconResponder = function(wormholeMessageReceiver, wormholeMessageSender) {
  wormholeMessageReceiver.on('beacon', function() {
    wormholeMessageSender.sendReady();
  });
};

module.exports = WormholeBeaconResponder;
