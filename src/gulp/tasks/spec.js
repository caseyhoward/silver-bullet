var gulp = require('gulp');
var karma = require('karma').server;

gulp.task('spec', ['spec-unit', 'spec-integration']);

gulp.task('spec-unit', ['browserify', 'browserify-tests'], function (done) {
  karma.start({
    files: ['dist/test_bundle.js'],
    configFile: __dirname + '/../../../karma.conf.js',
    singleRun: true,
    port: 9876
  }, done);
});

gulp.task('spec-integration', ['browserify', 'browserify-integration-tests'], function (done) {
  var childProcess = require('child_process');
  var process = childProcess.spawn('gulp', ['test-server']);
  var karmaCallback = function() {
    process.kill();
    done();
  };
  setTimeout(function() {
    karma.start({
      files: ['dist/integration_test_bundle.js'],
      configFile: __dirname + '/../../../karma.conf.js',
      singleRun: true,
      port: 9877
    }, karmaCallback);
  }, 5000);
});

gulp.task('spec-dev', ['browserify', 'browserify-tests', 'browserify-integration-tests'], function (done) {
  karma.start({
    files: ['dist/test_bundle.js'],
    configFile: __dirname + '/../../../karma.conf.js',
    singleRun: false,
    port: 9876
  }, done);
});
