module.exports = function(grunt) {
  var bower = grunt.file.readJSON('bower.json');
  var google = require('google-cdn-data');
  var cdnjs = require('cdnjs-cdn-data');
  var merge = require('merge')

  var cdnSources = {
    underscore: {
      versions: ['1.6.0'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/underscore.js/' + version + '/underscore-min.js';
      }
    },

    bootstrap: {
      versions: ['3.2.0'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + version + '/js/bootstrap.min.js';
      }
    },

    'angular-bootstrap': {
      versions: ['0.11.2'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/' + version + '/ui-bootstrap-tpls.min.js';
      }
    }
  }

  var cdnData = merge(google, cdnjs, cdnSources);
  var chromeScripts = ['app/scripts/chromereload.js', 'app/scripts/main.js'];

  var isGameScript = function(src) {
    if (chromeScripts.indexOf(src) > -1) {
      return false;
    } else {
      return true;
    }
  }

  grunt.initConfig({
    copy: {
      web: {
        files: [
          {expand: true, cwd: 'app/', src: ['*.html', 'images/**', 'styles/**'], dest: 'dist/web/play'}
        ]
      },

      chrome: {
        files: [
          {
            expand: true,
            cwd: 'app/',
            src: [
              'bower_components/**/*.min.{js,css}',
              'bower_components/**/{normalize,underscore}.{css,js}',
              'bower_components/font-awesome/fonts/*',
              'bower_components/**/angular-animate.js' // minified version is broken in 1.2.28
            ],
            dest: 'dist/chrome'},
          {
            expand: true,
            cwd: 'app/',
            src: ['manifest.json', 'scripts/main.js', '*.html', 'images/**', 'styles/**'],
            dest: 'dist/chrome'
          }
        ]
      }
    }, // copy

    cdnify: {
      options: {
        cdn: cdnData
      },
      dist: {
        html: ['dist/web/play/index.html']
      }
    }, // cdnify

    replace: {
      google: {
        options: {
          patterns: [
            {
              match: /.*google-inline.*/g,
              replacement: ''
            }
          ]
        },
        files: [
          {src: 'dist/web/play/index.html', dest: 'dist/web/play/index.html'}
        ]
      }, // replace:google

      css: {
        options: {
          patterns: [
            {
              match: /link rel="stylesheet" href="bower_components(.+)"/g,
              replacement: function(match, p1) {
                var cdn = null;

                if (p1.match(/font-awesome/)) {
                  cdn = '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css';
                } else if (p1.match(/normalize/)) {
                  cdn = '//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css';
                } else if (p1.match(/bootstrap/)) {
                  cdn = '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/css/bootstrap.min.css'
                }

                if (cdn) {
                  return 'link rel="stylesheet" href="' + cdn + '"';
                } else {
                  return match
                }
              }
            }
          ]
        },
        files: [
          {src: 'dist/web/play/index.html', dest: 'dist/web/play/index.html'}
        ]
      }, // replace:css

      bower: {
        options: {
          patterns: [
            {
              match: /("bower_components.+\/)(.+)\.(css|js)"/g,
              replacement: function(match, p1, p2, p3) {
                if (p2.match(/(normalize|underscore|angular-animate)/)) {
                  return match;
                } else {
                  return p1 + p2 + '.min.' + p3 + '"';
                }
              }
            }
          ]
        },
        files: [
          {src: 'dist/chrome/index.html', dest: 'dist/chrome/index.html'}
        ]
      }, // replace:bower

      scripts: {
        options: {
          patterns: [
            {
              match: /<script src="scripts\/.+<\/script>\n/g,
              replacement: function(match) {
                if (match.match(/memorymaster\.js/)) {
                  return '<script src="game.js"></script>\n';
                } else {
                  return '';
                }
              }
            }
          ]
        },
        files: [
          {src: 'dist/web/play/index.html', dest: 'dist/web/play/index.html'},
          {src: 'dist/chrome/index.html', dest: 'dist/chrome/index.html'}
        ]
      } // replace:scripts
    }, // replace

    uglify: {
      options: {
        mangle: false
      },
      web: {
        files: [
          {src: ['app/scripts/memorymaster.js', 'app/scripts/**/*.js'], dest: 'dist/web/play/game.js', filter: isGameScript}
        ]
      },
      chrome: {
        files: [
          {src: ['app/scripts/memorymaster.js', 'app/scripts/**/*.js'], dest: 'dist/chrome/game.js', filter: isGameScript}
        ]
      },
    }, // uglify

    sitemap: {
      dist: {
        pattern: ['dist/web/index.html', 'dist/web/play/index.html'],
        siteRoot: 'dist/web/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-google-cdn');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sitemap');

  grunt.registerTask('build:web', ['copy:web', 'cdnify', 'replace:google', 'replace:css', 'replace:scripts', 'uglify:web', 'sitemap']);
  grunt.registerTask('build:chrome', ['copy:chrome', 'replace:scripts', 'replace:bower', 'uglify:chrome']);

  grunt.registerTask('default', ['build']);
};
