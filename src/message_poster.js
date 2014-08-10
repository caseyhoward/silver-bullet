var MessagePoster = function(window, targetOrigin) {
  this.postMessage = function(message) {
    window.postMessage(JSON.stringify(message), targetOrigin);
  };
};

MessagePoster.create = function(window, targetOrigin) {
  return new MessagePoster(window, targetOrigin);
};

module.exports = MessagePoster;
