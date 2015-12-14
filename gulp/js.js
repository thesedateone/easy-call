'use strict';
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
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

gulp.task('vendor_js', function() {
  return gulp.src(vendor_js)
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(concat('vendor.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'))
});


gulp.task('app_js', function() {
  return gulp.src(['web/**/module.js', 'web/**/*.js'])
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(concat('app.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/js'))
});


gulp.task('js:watch', ['app_js'], function () {
  gulp.watch('web/**/*.js', ['app_js'])
})