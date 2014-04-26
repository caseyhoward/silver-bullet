var MessagePoster = function() {
  this.postMessage = function(window, message, targetOrigin) {
    window.postMessage(message, targetOrigin);
  };
};

module.exports = MessagePoster;
