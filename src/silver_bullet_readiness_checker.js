var Promise = require('es6-promise').Promise;
var _ = require('lodash');

var SilverBulletReadinessChecker = function(silverBulletMessageReceiver) {
  var promise = new Promise(function(resolve, reject) {
    silverBulletMessageReceiver.on('ready', function() {
      resolve();
    });
  });

  this.whenReady = function() {
    return promise;
  };
};

SilverBulletReadinessChecker.create = function(silverBulletMessageReceiver) {
 return new SilverBulletReadinessChecker(silverBulletMessageReceiver);
};

module.exports = SilverBulletReadinessChecker;
