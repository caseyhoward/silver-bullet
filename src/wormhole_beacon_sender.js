var WormholeBeaconSender = function(wormholeMessageSender, wormholeMessageReceiver, wormholeReadinessChecker) {
  var wormholeReady = false;
  var sendBeaconsUntilReady = function() {
    if (!wormholeReady) {
      wormholeMessageSender.sendBeacon();
      setTimeout(sendBeaconsUntilReady, 1000);
    }
  };
  setTimeout(sendBeaconsUntilReady, 100);
  wormholeReadinessChecker.whenReady().then(function() { wormholeReady = true; });
};

module.exports = WormholeBeaconSender;
