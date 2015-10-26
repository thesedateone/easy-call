'use strict';
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat');

var base = 'bower_components/**/';

var vendor_js = [
  base + 'dist/jquery.js',
  base + 'dist/**/bootstrap.js',
  base + 'lodash.js',
  base + 'angular.js',
  base + 'angular-route.js',
  base + 'dist/restangular.js'
];

gulp.task('app_js', function() {
  return gulp.src(['web/**/module.js', 'web/**/*.js'])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/app/js'))
});

gulp.task('vendor_js', function() {
  return gulp.src(vendor_js)
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('assets/vendor/js'))
});

gulp.task('js', ['app_js', 'vendor_js']);
