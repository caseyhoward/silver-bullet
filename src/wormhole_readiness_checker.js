var Promise = require('es6-promise').Promise;
var _ = require('lodash');

var WormholeReadinessChecker = function(wormholeMessageReceiver) {
  var resolves = [];

  wormholeMessageReceiver.on('ready', function() {
    _.each(resolves, function(resolve) { resolve(); });
  });

  this.whenReady = function() {
    var promise = new Promise(function(resolve, reject) {
      resolves.push(resolve);
    });
    return promise;
  };
};

module.exports = WormholeReadinessChecker;
