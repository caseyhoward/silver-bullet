var WormholeBeaconSender = function(wormholeMessageSender, wormholeReadinessChecker, setTimeout) {
  this.start = function() {
    var wormholeReady = false;
    var sendBeaconsUntilReady = function() {
      if (!wormholeReady) {
        wormholeMessageSender.sendBeacon();
        setTimeout(sendBeaconsUntilReady, 100);
      }
    };
    sendBeaconsUntilReady();
    wormholeReadinessChecker.whenReady().then(function() {  wormholeReady = true; });
  };
};

module.exports = WormholeBeaconSender;
