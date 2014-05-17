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
var sourceFiles = [
  './src/json_parser.js',
  './src/iframe_opener.js',
  './src/message_poster.js',
  './src/wormhole.js',
];

var doBrowserify = function(files, outputFile) {
  return browserify(files)
    .on('error', console.error)
    .bundle({debug: true})
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
};

gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
  mkdirp('dist', console.error);
  doBrowserify(sourceFiles);
});

gulp.task('spec', ['scripts'], function() {
  gulp.src(glob.sync('spec/*_spec.js'))
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: 'run'
  })).on('error', function() { this.emit('end'); });
});

gulp.task('default', ['scripts', 'lint', 'spec']);
