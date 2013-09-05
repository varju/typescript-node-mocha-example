'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    typescript: {
      src: {
        src: ['src/**/*.ts'],
        dest: 'src',
        options: {
          module: 'commonjs',
          base_path: 'src',
          sourcemap: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: ['src/test/**/*.js']
      }
    },

    // execute 'grunt curl' manually to refresh the external definition files
    curl: {
      'ts-definitions/restify/restify.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/restify/restify.d.ts',
      'ts-definitions/mocha/mocha.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/mocha/mocha.d.ts',
      'ts-definitions/node/node.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node.d.ts'
    },

    nodemon: {
      dev: {
        options: {
          file: 'src/app/main.js',
          // monitor the build dir so that external builders (e.g. WebStorm) trigger restart
          watchedFolders: ['src']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('compile', 'Compile our production and test code', ['typescript']);
  grunt.registerTask('test', 'Execute the unit tests', ['mochaTest']);
  grunt.registerTask('start', 'Start the webserver', ['nodemon']);

  grunt.registerTask('default', ['compile', 'test', 'start']);

};
