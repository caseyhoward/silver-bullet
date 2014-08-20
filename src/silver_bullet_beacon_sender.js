var SilverBulletBeaconSender = function(silverBulletMessageSender, silverBulletReadinessChecker, setTimeout) {
  this.start = function() {
    var silverBulletReady = false;
    var sendBeaconsUntilReady = function() {
      if (!silverBulletReady) {
        silverBulletMessageSender.sendBeacon();
        setTimeout(sendBeaconsUntilReady, 100);
      }
    };
    sendBeaconsUntilReady();
    silverBulletReadinessChecker.whenReady().then(function() {  silverBulletReady = true; });
  };
};

module.exports = SilverBulletBeaconSender;
