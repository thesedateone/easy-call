module.exports = function(config) {
  config.set({
    
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/lodash/dist/lodash.js',
      'bower_components/restangular/dist/restangular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'web/**/*.js',
      'test/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
      'node_modules/**/*min.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'web/js/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/',
      includeAllSources: true,
      watermarks: {
        statements: [ 50, 75 ],
        functions: [ 50, 75 ],
        branches: [ 50, 75 ],
        lines: [ 50, 75 ]
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots', 'growl', 'coverage'],

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // browsers: ['Chrome', 'Firefox'],
    browsers: ['PhantomJS'],

  });
};