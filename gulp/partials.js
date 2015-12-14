'use strict';
var gulp = require('gulp'),
    plumber = require('gulp-plumber');

gulp.task('partials', function() {
  return gulp.src('web/partials/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('assets/partials'))
});


gulp.task('partials:watch', ['partials'], function () {
  gulp.watch('web/partials/**/*.html', ['partials'])
})