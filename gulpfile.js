'use strict';
var fs = require('fs')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var concat = require('gulp-concat')
var sass = require('gulp-sass');

// Application JS

gulp.task('app_js', function() {
  return gulp.src(['web/**/module.js', 'web/**/*.js'])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/app/js'))
})

// Vendor JS

var base = 'bower_components/**/'
var vendor = [
  base + 'dist/jquery.js',
  base + 'dist/**/bootstrap.js',
  base + 'lodash.js',
  base + 'angular.js',
  base + 'angular-route.js',
  base + 'dist/restangular.js'
]

gulp.task('vendor_js', function() {
  return gulp.src(vendor)
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('assets/vendor/js'))
})

// Application Style

gulp.task('app_sass', function() {
  return gulp.src('style/**/*.sass')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('assets/app/css'))
})

// META Tasks

gulp.task('js', ['app_js', 'vendor_js'])
