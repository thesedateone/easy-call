'use strict';
var fs = require('fs')
var gulp = require('gulp')
var plumber = require('gulp-plumber')
var concat = require('gulp-concat')
var sass = require('gulp-sass')
var flatten = require('gulp-flatten')

// Application JS

gulp.task('app_js', function() {
  return gulp.src(['web/**/module.js', 'web/**/*.js'])
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/app/js'))
})

// Vendor JS

var base = 'bower_components/**/'
var vendor_js = [
  base + 'dist/jquery.js',
  base + 'dist/**/bootstrap.js',
  base + 'lodash.js',
  base + 'angular.js',
  base + 'angular-route.js',
  base + 'dist/restangular.js'
]

gulp.task('vendor_js', function() {
  return gulp.src(vendor_js)
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

// Vendor Style

var vendor_css = [
  base + 'dist/**/bootstrap.min.css',
  base + 'font-awesome.min.css'
]

gulp.task('vendor_css', function() {
  return gulp.src(vendor_css)
    .pipe(plumber())
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('assets/vendor/css'))
})

gulp.task('fonts', function() {
  return gulp.src([
      base + 'font-awesome/fonts/*',
      base + 'bootstrap/dist/fonts/*'])
    .pipe(flatten())
    .pipe(gulp.dest('assets/vendor/fonts'))
})

gulp.task('partials', function() {
  return gulp.src('web/partials/**/*.html')
    .pipe(gulp.dest('assets/app/partials'))
})

// META Tasks

gulp.task('js', ['app_js', 'vendor_js'])
gulp.task('css', ['app_sass', 'vendor_css'])

gulp.task('build', ['js', 'css', 'fonts', 'partials'])

