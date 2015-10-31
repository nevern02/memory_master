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

  var filterChromeFiles = function(src) {
    var chromeFiles = ['app/scripts/chromereload.js', 'app/scripts/main.js'];

    if (chromeFiles.indexOf(src) === -1) {
      return true;
    } else {
      return false;
    }
  }

  grunt.initConfig({
    copy: {
      release: {
        files: [
          {expand: true, cwd: 'app/', src: ['**'], dest: 'dist/web/play'}
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
      },

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
      }
    }, // replace

    uglify: {
      options: {
        mangle: false
      },
      all: {
        files: [
          {src: ['app/scripts/memorymaster.js', 'app/scripts/services/imagelist.js'], dest: 'dist/web/play/scripts.js'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-google-cdn');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['copy', 'cdnify', 'replace', 'uglify']);

  grunt.registerTask('default', ['build']);
};
