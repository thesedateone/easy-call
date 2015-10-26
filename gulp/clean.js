'use strict';
var gulp = require('gulp'),
    rimraf = require('gulp-rimraf');

var target = [
  'assets/css',
  'assets/fonts',
  'assets/js',
  'assets/partials'
];

gulp.task('clean', function() {
  gulp.src(target, { read: false })
    .pipe(rimraf());
});
