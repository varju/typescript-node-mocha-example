'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    typescript: {
      app: {
        src: ['src/app/**/*.ts'],
        dest: 'build/app',
        options: {
          module: 'commonjs',
          base_path: 'src/app',
          sourcemap: true
        }
      },

      test: {
        src: ['src/test/**/*.ts'],
        dest: 'build/test',
        options: {
          module: 'commonjs',
          base_path: 'src/test',
          sourcemap: false
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          quiet: false
        },
        src: ['build/test/**/*.js']
      }
    },

    // execute 'grunt curl' manually to refresh the external definition files
    curl: {
      'ts-definitions/restify.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/restify/restify.d.ts',
      'ts-definitions/mocha.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/mocha/mocha.d.ts',
      'ts-definitions/node.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node.d.ts'
    },

    nodemon: {
      dev: {
        options: {
          file: 'build/app/main.js',
          // monitor the build dir so that external builders (e.g. WebStorm) trigger restart
          watchedFolders: ['build']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('compile', 'Compile our production code', ['typescript:app']);
  grunt.registerTask('test', 'Compile and execute the unit tests', ['typescript:test', 'mochaTest']);
  grunt.registerTask('start', 'Start the webserver', ['nodemon']);

  grunt.registerTask('default', ['compile', 'test', 'start']);

};
