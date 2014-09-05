'use strict';

var requireDir = require('require-dir');
requireDir('./src/gulp/tasks', { recurse: true });

var gulp = require('gulp');
var jshint = require('gulp-jshint');

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

gulp.task('default', ['lint', 'spec']);
