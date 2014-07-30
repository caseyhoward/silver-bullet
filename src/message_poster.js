var MessagePoster = function() {
  this.postMessage = function(window, message, targetOrigin) {
    console.log('Posting the following message to ' + targetOrigin + ':');
    console.log(message);
    window.postMessage(JSON.stringify(message), targetOrigin);
  };
};

module.exports = new MessagePoster();
