module.exports = function (karma) {
  karma.set({
    files: ['dist/test_bundle.js'],
    frameworks: ['mocha', 'sinon', 'chai'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    browsers: ['PhantomJS', 'Chrome']
  });
};
