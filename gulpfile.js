'use strict';
var fs = require('fs'),
    gulp = require('gulp');

fs.readdirSync(__dirname + '/gulp').forEach(function (module) {
  require(__dirname + '/gulp/' + module)
});

// gulp.task('build', ['rev'])
gulp.task('build', ['js', 'css', 'fonts', 'partials']);
