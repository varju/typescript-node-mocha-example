'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development'
      },
      prod: {
        NODE_ENV: 'production'
      }
    },

    typescript: {
      app: {
        src: ['app/**/*.ts'],
        options: {
          module: 'commonjs',
          sourcemap: true
        }
      },

      test: {
        src: ['test/**/*.ts'],
        options: {
          module: 'commonjs',
          sourcemap: true
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          require: 'config/coverage_blanket',
          quiet: false
        },
        src: ['test/**/*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'build/coverage.html'
        },
        src: ['test/**/*.js']
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      app: {
        files: ['app/**/*.ts'],
        tasks: ['typescript', '_runTests']
      },
      config: {
        files: ['config/**/*.js', 'config/**/*.json'],
        tasks: ['_runTests']
      },
      test: {
        files: ['test/**/*.ts'],
        tasks: ['typescript:test', '_runTests']
      },
      definitions: {
        files: ['ts-definitions/**/*.d.ts'],
        tasks: ['typescript', '_runTests']
      }
    },

    // monitors the compiled .js files so that external builders (e.g. WebStorm) trigger restart
    nodemon: {
      dev: {
        options: {
          file: 'app/main.js',
          watchedExtensions: ['js', 'json'],
          watchedFolders: ['app', 'config', 'test']
        }
      }
    },

    // execute 'grunt curl' manually to refresh the external definition files
    curl: {
      'ts-definitions/express/express.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/express/express.d.ts',
      'ts-definitions/mocha/mocha.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/mocha/mocha.d.ts',
      'ts-definitions/node/node.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node.d.ts',
      'ts-definitions/should/should.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/should/should.d.ts',
      'ts-definitions/sinon/sinon-1.5.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/sinon/sinon-1.5.d.ts',
      'ts-definitions/superagent/superagent.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/superagent/superagent.d.ts',
      'ts-definitions/supertest/supertest.d.ts': 'https://github.com/borisyankov/DefinitelyTyped/raw/master/supertest/supertest.d.ts'
    }
  });

  // These plugins provide necessary tasks
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-curl');

  // Task aliases
  grunt.registerTask('_runTests', ['env:test', 'mochaTest']);
  grunt.registerTask('test', ['typescript', '_runTests']);
  grunt.registerTask('dev', ['env:dev', 'nodemon']);
  grunt.registerTask('prod', ['env:prod', 'nodemon']);

  // Default task
  grunt.registerTask('default', ['test']);
};
