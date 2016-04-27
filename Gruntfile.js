module.exports = function(grunt) {
  var bower = grunt.file.readJSON('bower.json');
  var google = require('google-cdn-data');
  var cdnjs = require('cdnjs-cdn-data');
  var merge = require('merge')

  var extraCdnSources = {
    angular: {
      versions: ['1.5.5'],
      url: function (version) {
        return '//ajax.googleapis.com/ajax/libs/angularjs/' + version + '/angular.min.js';
      }
    },

    'angular-animate': {
      versions: ['1.5.5'],
      url: function (version) {
        return '//ajax.googleapis.com/ajax/libs/angularjs/' + version + '/angular-animate.min.js';
      }
    },

    'angular-bootstrap': {
      versions: ['1.3.2'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/' + version + '/ui-bootstrap-tpls.min.js';
      }
    },

    'angular-ui-router': {
      versions: ['0.2.18'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/' + version + '/angular-ui-router.min.js';
      }
    },

    bootstrap: {
      versions: ['3.3.6'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/' + version + '/js/bootstrap.min.js';
      }
    },

    jquery: {
      versions: ['2.2.2'],
      url: function (version) {
        return '//ajax.googleapis.com/ajax/libs/jquery/' + version + '/jquery.min.js';
      }
    },

    underscore: {
      versions: ['1.8.3'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/underscore.js/' + version + '/underscore-min.js';
      }
    }
  }

  var cdnData = merge(google, cdnjs, extraCdnSources);
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

      facebook: {
        files: [
          {expand: true, cwd: 'app/', src: ['*.html', 'images/**', 'styles/**'], dest: 'dist/facebook'}
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
              'bower_components/font-awesome/fonts/*'
            ],
            dest: 'dist/chrome'
          },
          {
            expand: true,
            cwd: 'app/',
            src: [
              'manifest.json',
              'scripts/main.js',
              '*.html',
              'images/**',
              'styles/**',
              'scripts/google-analytics-bundle.js'
            ],
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
        html: ['dist/web/play/index.html', 'dist/facebook/index.html']
      }
    }, // cdnify

    replace: {
      analytics: {
        options: {
          patterns: [
            {
              match: /.*replace-analytics.*/g,
              replacement: ''
            }
          ]
        },
        files: [
          {src: 'dist/web/play/index.html', dest: 'dist/web/play/index.html'},
          {src: 'dist/facebook/index.html', dest: 'dist/facebook/index.html'},
        ]
      }, // replace:analytics

      affiliate: {
        options: {
          patterns: [
            {
              match: /.*replace-affiliate.*/g,
              replacement: ''
            }
          ]
        },
        files: [
          {src: 'dist/web/play/prepare.html', dest: 'dist/web/play/prepare.html'},
          {src: 'dist/web/play/summary.html', dest: 'dist/web/play/summary.html'},
        ]
      }, // replace:affiliate

      chrome: {
        options: {
          patterns: [
            {
              match: /.*replace-chrome.*/g,
              replacement: ''
            }
          ]
        },
        files: [
          {src: 'dist/chrome/index.html', dest: 'dist/chrome/index.html'},
          {src: 'dist/chrome/prepare.html', dest: 'dist/chrome/prepare.html'},
          {src: 'dist/chrome/summary.html', dest: 'dist/chrome/summary.html'},
        ]
      }, // replace:chrome

      css: {
        options: {
          patterns: [
            {
              match: /link rel="stylesheet" href="bower_components(.+)"/g,
              replacement: function(match, p1) {
                var cdn = null;

                if (p1.match(/font-awesome/)) {
                  cdn = '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.1/css/font-awesome.min.css';
                } else if (p1.match(/normalize/)) {
                  cdn = '//cdnjs.cloudflare.com/ajax/libs/normalize/4.1.1/normalize.min.css';
                } else if (p1.match(/bootstrap/)) {
                  cdn = '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css'
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
          {src: 'dist/web/play/index.html', dest: 'dist/web/play/index.html'},
          {src: 'dist/facebook/index.html', dest: 'dist/facebook/index.html'}
        ]
      }, // replace:css

      bower: {
        options: {
          patterns: [
            {
              match: /("bower_components.+\/)(.+)\.(css|js)"/g,
              replacement: function(match, p1, p2, p3) {
                if (p2.match(/(normalize|underscore)/)) {
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
          {src: 'dist/facebook/index.html', dest: 'dist/facebook/index.html'},
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
      facebook: {
        files: [
          {src: ['app/scripts/memorymaster.js', 'app/scripts/**/*.js'], dest: 'dist/facebook/game.js', filter: isGameScript}
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
    }, // sitemap

    zip: {
      chrome: {
        cwd: 'dist/chrome',
        src: ['dist/chrome/**', '!dist/chrome/*.zip'],
        dest: 'dist/chrome/memorymaster.zip'
      }
    }, // zip

    rsync: {
      options: {
        args: ['--verbose'],
        exclude: ['.git*', 'node_modules'],
        recursive: true
      },
      deploy: {
        options: {
          src: 'dist/facebook/',
          dest: '/var/www/memory_master',
          host: 'deploy@davos.blrice.net',
          delete: true
        }
      }
    } // rsync
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-google-cdn');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sitemap');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-rsync');

  grunt.registerTask('build:web', ['copy:web', 'cdnify', 'replace:analytics', 'replace:css', 'replace:affiliate', 'replace:scripts', 'uglify:web', 'sitemap']);
  grunt.registerTask('build:facebook', ['copy:facebook', 'cdnify', 'replace:analytics', 'replace:css', 'replace:scripts', 'uglify:facebook']);
  grunt.registerTask('build:chrome', ['copy:chrome', 'replace:chrome', 'replace:scripts', 'replace:bower', 'uglify:chrome', 'zip:chrome']);
  grunt.registerTask('build', ['build:web', 'build:chrome', 'build:facebook']);

  grunt.registerTask('default', ['build']);
};
