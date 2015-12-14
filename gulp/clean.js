'use strict';
var gulp = require('gulp'),
    rimraf = require('gulp-rimraf');

var app_target = [
  'assets/css/main.css',
  'assets/js/app.js',
  'assets/partials',
];

var vendor_target = [
  'assets/css/vendor.min.css',
  'assets/js/vendor.js',
  'assets/fonts',
  'bower_components'
];

gulp.task('app_clean', function() {
  gulp.src(app_target, { read: false })
    .pipe(rimraf());
});

gulp.task('vendor_clean', function() {
  gulp.src(vendor_target, { read: false })
    .pipe(rimraf());
});

gulp.task('clean', ['app_clean', 'vendor_clean']);