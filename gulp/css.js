'use strict';
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

var base = 'bower_components/**/';

var vendor_css = [
  base + 'dist/**/bootstrap.min.css',
  base + 'font-awesome.min.css'
];

gulp.task('app_sass', function() {
  return gulp.src('style/**/*.sass')
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('assets/css'))
});

gulp.task('vendor_css', function() {
  return gulp.src(vendor_css)
    .pipe(plumber())
    .pipe(concat('vendor.min.css'))
    .pipe(gulp.dest('assets/css'))
});

gulp.task('css', ['app_sass', 'vendor_css']);
