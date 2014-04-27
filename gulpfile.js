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

var specFiles = [
  './spec/json_parser_spec.js',
  './spec/message_poster_spec.js',
  './spec/wormhole_spec.js'
];

var doBrowserify = function(files, outputFile) {
  browserify(files)
    .on('error', console.error)
    .bundle({debug: true})
    .pipe(fs.createWriteStream(outputFile))
};

gulp.task('lint', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function () {
  mkdirp('dist', console.error);
  doBrowserify(sourceFiles, './dist/bundle.js');
});

gulp.task('spec', ['scripts'], function() {
  doBrowserify(sourceFiles.concat(specFiles), './dist/specs.js');
  gulp.src('./dist/specs.js')
    .pipe(karma({configFile: 'karma.conf.js', action: 'run'}));
});

gulp.task('default', ['scripts', 'lint', 'spec']);
