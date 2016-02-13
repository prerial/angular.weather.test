module.exports = function(config){
  config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections
    basePath : '../',

    // files to include, ordered by dependencies
    files : [
      // include relevant Angular files and libs
      'target/libs/angular/angular.js',
      'target/libs/angular/angular-route.js',
      'test/libs/angular/angular-mocks.js',

      // include JS files
      'src/js/modules.js',
      'src/js/weather/*/*.js',

      //'for-unit-test/**/*.js',

      // include html template files

      // include unit test specs
      'test/mocks/*.js',
      // include unit test specs
      'test/unit/*.js'
    ],
    // files to exclude
    exclude : [
    ],

    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,

    // testing framework, be sure to install the correct karma plugin
    frameworks: ['jasmine'],

    // browsers to test against, be sure to install the correct browser launcher plugins
    browsers : ['PhantomJS'],

    // map of preprocessors that is used mostly for plugins
    preprocessors: {
    },

    reporters: ['dots', 'progress', 'coverage'],

    // list of karma plugins
    plugins : [
      'karma-jshint-preprocessor',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher'
    ],

    // plugin settings
    ngHtml2JsPreprocessor: {
      stripPrefix: 'target/'
    },
    coverageReporter: {
      // type of file to output, use text to output to console
      type : 'text',
      // directory where coverage results are saved
      dir: 'test-results/coverage/'
      // if type is text or text-summary, you can set the file name
      // file: 'coverage.txt'
    },
    junitReporter: {
      outputFile: 'test-results/junit-results.xml'
    }
})};
