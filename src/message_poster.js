var MessagePoster = function() {
  var log = function(string) {
    console.log(window.location.href + ': ' + string);
  };
  this.postMessage = function(window, message, targetOrigin) {
    log('posting message ' + message + ' to ' + targetOrigin);
    window.postMessage(message, targetOrigin);
  };
};

module.exports = MessagePoster;
