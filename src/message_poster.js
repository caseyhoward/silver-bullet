var MessagePoster = function(window, targetOrigin, options) {
  options = options || {};
  var serialize = options.serialize || function identity(message) { return message; };

  this.postMessage = function(message) {
    window.postMessage(serialize(message), targetOrigin);
  };
};

MessagePoster.create = function(window, targetOrigin, options) {
  return new MessagePoster(window, targetOrigin, options);
};

module.exports = MessagePoster;
