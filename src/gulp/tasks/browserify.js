var browserify = require('browserify');
var watchify = require('watchify');
var bundleLogger = require('../util/bundle_logger');
var gulp = require('gulp');
var handleErrors = require('../util/handle_errors');
var source = require('vinyl-source-stream');
var glob = require('glob');
var _ = require('lodash');

var doBrowserify = function(entries, fileName, bundleOptions) {
  bundleOptions = bundleOptions || {};
  var bundler = browserify({
    cache: {}, packageCache: {}, fullPaths: false,
    entries: entries
  });

  var bundle = function() {
    bundleLogger.start();

    return bundler
      .bundle(_.merge({read: false, debug: true}, bundleOptions))
      // .on('error', handleErrors)
      .on('error', function(error) { console.log(error); })
      .pipe(source(fileName))
      .pipe(gulp.dest('./dist/'))
      .on('end', bundleLogger.end);
  };

  if(global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  return bundle();
};

gulp.task('browserify', function() {
  return doBrowserify(['./src/silver_bullet/factory.js'], 'silver_bullet.js', {standalone: 'silverBullet'});
});

gulp.task('browserify-tests', function() {
  var integrationFiles = glob.sync('./spec/integration/**/*_spec.js');
  var files = glob.sync('./spec/**/*_spec.js');
  return doBrowserify(_.difference(files, integrationFiles), 'test_bundle.js');
});

gulp.task('browserify-integration-tests', function() {
  return doBrowserify(glob.sync('./spec/integration/**/*_spec.js'), 'integration_test_bundle.js');
});

