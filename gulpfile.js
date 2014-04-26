'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var path = require('path');
var fs = require('fs');
var browserify = require('browserify');
var jsRoot = path.join(__dirname);
var bundlePath = path.join('dist', 'bundle.js');

gulp.task('lint', function() {
  return gulp.src('dist/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
  browserify()
  .require(require.resolve('./src/util.js'), { entry: true })
  .bundle({debug: true})
  .on('error', function (err) { console.error(err); })
  .pipe(fs.createWriteStream(bundlePath));
});

gulp.task('spec', ['scripts'], function() {
  gulp.src(['spec/*_spec.js'])
    .pipe(karma({configFile: 'karma.conf.js'}));
});

gulp.task('default', ['scripts', 'lint', 'spec']);
