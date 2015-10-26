'use strict';
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    flatten = require('gulp-flatten');

var base = 'bower_components/**/';

var vendor_fonts = [
  base + 'font-awesome/fonts/*',
  base + 'bootstrap/dist/fonts/*'
];

gulp.task('fonts', function() {
  return gulp.src(vendor_fonts)
    .pipe(flatten())
    .pipe(gulp.dest('assets/fonts'))
});
