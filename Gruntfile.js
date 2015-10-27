module.exports = function(grunt) {
  var bower = grunt.file.readJSON('bower.json');
  var google = require('google-cdn-data');
  var cdnjs = require('cdnjs-cdn-data');
  var merge = require('merge')

  var underscore = {
    underscore: {
      versions: ['1.6.0'],
      url: function (version) {
        return '//cdnjs.cloudflare.com/ajax/libs/underscore.js/' + version + '/underscore-min.js';
      }
    }
  }

  var cdnData = merge(google, cdnjs, underscore);

  grunt.initConfig({
    copy: {
      release: {
        files: [
          {expand: true, cwd: 'app/', src: ['**'], dest: 'dist/web'}
        ]
      }
    }, // copy

    cdnify: {
      options: {
        cdn: cdnData
      },
      dist: {
        html: ['dist/web/index.html']
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
          {src: 'dist/web/index.html', dest: 'dist/web/index.html'}
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
