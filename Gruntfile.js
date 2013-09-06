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

    watch: {
      test: {
        files: ['src/**/*.ts'],
        tasks: ['compile', 'test']
      }
    },

    // execute 'grunt curl' manually to refresh the external definition files
    curl: {
      'ts-definitions/express/express.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/express/express.d.ts',
      'ts-definitions/mocha/mocha.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/mocha/mocha.d.ts',
      'ts-definitions/mongodb/mongodb.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/mongodb/mongodb.d.ts',
      'ts-definitions/node/node.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node.d.ts',
      'ts-definitions/superagent/superagent.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/superagent/superagent.d.ts',
      'ts-definitions/supertest/supertest.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/supertest/supertest.d.ts'
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
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('compile', 'Compile our production and test code', ['typescript']);
  grunt.registerTask('test', 'Execute the unit tests', ['mochaTest']);
  grunt.registerTask('start', 'Start the webserver', ['nodemon']);

  grunt.registerTask('testLoop', 'Reruns the tests every time the .ts files are updated', ['watch:test']);

  grunt.registerTask('default', ['compile', 'test', 'start']);

};
