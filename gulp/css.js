'use strict';
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCSS = require('gulp-minify-css');


gulp.task('app_css', function() {
  return gulp.src('web/style/**/*.sass')
    .pipe(sourcemaps.init())
      .pipe(plumber())
      .pipe(sass({ 
        outputStyle: 'compressed' 
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
});


var base = 'bower_components/**/';
var vendor_css = [
  base + 'dist/**/bootstrap.css',
  base + 'font-awesome.css'
];

gulp.task('vendor_css', function() {
  return gulp.src(vendor_css)
    .pipe(sourcemaps.init())
      .pipe(minifyCSS())
      .pipe(plumber())
      .pipe(concat('vendor.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/css'))
});


gulp.task('css:watch', ['app_css'], function () {
  gulp.watch('web/style/**/*.sass', ['app_css'])
})