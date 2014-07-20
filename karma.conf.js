module.exports = function (karma) {
  karma.set({
    frameworks: ['browserify', 'mocha', 'sinon', 'chai'],

    files: [
      "node_modules/es5-shim/es5-shim.js"
    ],

    browserify: {
      files: [
        "spec/**/*_spec.js"
      ]
    },

    preprocessors: {
      "/**/*.browserify": "browserify"
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['PhantomJS', 'Chrome'],
    singleRun: false
  });
};
