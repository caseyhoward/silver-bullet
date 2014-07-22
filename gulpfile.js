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

var sourceFilesGlobString = './src/**/*.js';
var testFilesGlobString = 'spec/**/*_spec.js';

var sourceFiles = glob.sync(sourceFilesGlobString);
var testFiles = glob.sync(testFilesGlobString);

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

gulp.task('watch', function() {
  gulp.watch([sourceFilesGlobString, testFilesGlobString], ['default']);
});

gulp.task('test-server', function() {
  var server = require('node-static');

  var startServer = function() {
    var fileServer = new server.Server('./');
    require('http').createServer(function (request, response) {
      request.addListener('end', function () {
        fileServer.serve(request, response);
      }).resume();
    }).listen(8080);
    return fileServer;
  };

  startServer();
});

gulp.task('default', ['scripts', 'lint', 'spec']);
