/// <reference path='../../../app.d.ts' />

import request = require('supertest');
import server = require('../../app/server')

describe('root controller', () => {
  describe('/ endpoint', () => {
    it('should say hello', (done) => {
      request(server.app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect({ hello: 'world' })
        .end((err, res) => {
          if (err) throw err;
          done();
        });
    });
  });
});
