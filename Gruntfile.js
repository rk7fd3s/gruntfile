'use strict';

var excludes = [],
    concats = [
  '**/??_*.js'
];

for (var i in concats) {
  excludes.push('!' + concats[i])
}

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    'pkg': grunt.file.readJSON('package.json'),

    'dir': {
      'src': './resource',
      'dist': '.',
      'tmp': './tmp',
      'js': 'js',
      'css': 'css'
    },
    'clean': {
      'pre': [
        '<%= dir.tmp %>',
        '<%= dir.dist %>/<%= dir.js %>/*',
        '<%= dir.dist %>/<%= dir.css %>/*'
      ],
      'after': [
        '<%= dir.tmp %>'
      ]
    },
    'concat': {
      'all': {
        'src': ['<%= dir.src %>/<%= dir.js %>/**/??_*.js'],
        'dest': '<%= dir.tmp %>/<%= dir.js %>/scripts.js'
      }
    },
    'uglify': {
      'all': {
        'src': ['<%= dir.tmp %>/<%= dir.js %>/scripts.js'],
        'dest': '<%= dir.dist %>/<%= dir.js %>/scripts.min.js'
      }
    },
    'copy': {
      'main': {
        'expand': true,
        'cwd': '<%= dir.src %>/<%= dir.js %>/',
        'src': ['**/*.js', excludes],
        'dest': '<%= dir.dist %>/<%= dir.js %>/'
      }
    }
  });

  grunt.registerTask('default', ['clean:pre', 'concat', 'copy', 'uglify', 'clean:after']);

};