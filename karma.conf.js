module.exports = function (karma) {
  karma.set({
    frameworks: ['mocha', 'sinon', 'chai'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    browsers: ['PhantomJS', 'Chrome']
  });
};
