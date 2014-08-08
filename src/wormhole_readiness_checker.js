var Promise = require('es6-promise').Promise;
var _ = require('lodash');

var WormholeReadinessChecker = function(wormholeMessageReceiver) {
  var promise = new Promise(function(resolve, reject) {
    wormholeMessageReceiver.on('ready', function() {
      resolve();
    });
  });

  this.whenReady = function() {
    return promise;
  };
};

module.exports = WormholeReadinessChecker;
