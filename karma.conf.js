module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['browserify', 'mocha', 'sinon', 'chai'],
    files: ['spec/*_spec.js'],
    preprocessors: {'spec/*_spec.js': 'browserify'},
    exclude: [],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS', 'Chrome'],
    singleRun: false
  });
};
