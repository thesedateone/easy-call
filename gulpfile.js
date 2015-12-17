'use strict';
var fs = require('fs'),
    gulp = require('gulp');

fs.readdirSync(__dirname + '/gulp').forEach(function (module) {
  require(__dirname + '/gulp/' + module)
});

// gulp.task('build', ['rev'])
gulp.task('app_build', ['app_js', 'app_css', 'fonts', 'partials']);
gulp.task('vendor_build', ['vendor_js', 'vendor_css', 'fonts']);

gulp.task('watch', ['js:watch', 'css:watch', 'partials:watch', 'tdd']);

