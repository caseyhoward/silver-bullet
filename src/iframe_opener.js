var _ = require('lodash');

var IframeOpener = function() {
  this.open = function(url, options) {
    var iframe = document.createElement('iframe');
    iframe.src = url;
    _.merge(iframe, options);
    document.body.appendChild(iframe);
    return iframe;
  };
};

module.exports = new IframeOpener();
