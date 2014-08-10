'use strict';

var gulp = require('gulp');
var karma = require('gulp-karma');
var jshint = require('gulp-jshint');
var glob = require('glob');
var source = require('vinyl-source-stream');

gulp.task('lint', function() {
  return gulp.src(['src/*.js', 'spec/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
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

gulp.task('default', ['lint']);
