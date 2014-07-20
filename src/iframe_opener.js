var IframeOpener = function() {
  this.open = function(url, options) {
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = options.id;
    document.body.appendChild(iframe);
  };
};

module.exports = new IframeOpener();
