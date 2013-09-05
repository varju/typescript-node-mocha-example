/// <reference path='../../../app.d.ts' />

import assert = require('assert');
import fs = require('fs');
import restify = require('restify');
import server = require('../../app/server');

var SOCK = '/tmp/.tungsten_sock';

describe('root controller', () => {
  var SERVER;
  var CLIENT;

  beforeEach((done) => {
    fs.unlink(SOCK, () => {
      SERVER = server.createServer();
      SERVER.listen(SOCK, function () {
        CLIENT = restify.createClient({
          socketPath: SOCK,
          type: 'json'
        });
        assert.ok(CLIENT, 'bad client');
        done();
      });
    });
  });

  afterEach(() => {
    SERVER.close();
  });

  describe('/ endpoint', () => {
    it('should say hello', (done) => {
      CLIENT.get('/', (err, req, res, obj) => {
        assert.ifError(err);
        assert.deepEqual(obj, {hello: 'world'}, 'not equal');
        done();
      });
    });
  });
});
