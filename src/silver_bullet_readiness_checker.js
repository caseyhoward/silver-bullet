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

module.exports = SilverBulletReadinessChecker;
