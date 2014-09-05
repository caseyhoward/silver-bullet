var gulp = require('gulp');
var karma = require('karma').server;

gulp.task('spec', ['browserify', 'browserify-test'], function (done) {
  karma.start({
    configFile: __dirname + '/../../../karma.conf.js',
    singleRun: true
  }, done);
});