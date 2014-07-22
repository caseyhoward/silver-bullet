!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.wormhole=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
var IframeOpener = function() {
  this.open = function(url, options) {
    var iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.id = options.id;
    document.body.appendChild(iframe);
  };
};

module.exports = new IframeOpener();

},{}],2:[function(_dereq_,module,exports){
var iframeOpener = _dereq_('./iframe_opener');

var WormholeCreator = function(iframeOpener) {
  this.open = function(source) {
    iframeOpener.open(source);
  };
  this.opening = function(origin) {
  };
};

module.exports = new WormholeCreator(iframeOpener);

},{"./iframe_opener":1}]},{},[2])
(2)
});