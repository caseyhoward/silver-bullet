var SilverBulletBeaconSender = function(silverBulletMessagePoster, silverBulletReadinessChecker, setTimeout) {
  this.start = function() {
    var silverBulletReady = false;
    var sendBeaconsUntilReady = function() {
      if (!silverBulletReady) {
        silverBulletMessagePoster.sendBeacon();
        setTimeout(sendBeaconsUntilReady, 100);
      }
    };
    sendBeaconsUntilReady();
    silverBulletReadinessChecker.whenReady().then(function() {  silverBulletReady = true; });
  };
};

module.exports = SilverBulletBeaconSender;
