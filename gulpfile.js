'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var path = require('path');
var fs = require('fs');
var browserify = require('browserify');
var jsRoot = path.join(__dirname);
var bundlePath = path.join('dist', 'bundle.js');
var mkdirp = require('mkdirp');
var glob = require('glob');
var source = require('vinyl-source-stream');

var sourceFiles = glob.sync('./src/*.js');
var testFiles = glob.sync('spec/*_spec.js');

gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
  mkdirp('dist', console.error);
  return browserify(sourceFiles)
    .on('error', console.error)
    .bundle({debug: true})
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('spec', ['scripts'], function() {
  gulp.src(testFiles)
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: 'run'
  })).on('error', function() { this.emit('end'); });
});

gulp.task('default', ['scripts', 'lint', 'spec']);
