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
      }
    } // replace
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-google-cdn');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('build', ['copy', 'cdnify', 'replace']);

  grunt.registerTask('default', ['build']);
};
