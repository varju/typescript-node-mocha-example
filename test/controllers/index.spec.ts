/// <reference path='../test.d.ts' />

import should = require('should');
import request = require('supertest');

import server = require('../../app/server');

describe('root controller', () => {
  describe('GET /', () => {
    it('should list all the routes', (done) => {
      request(server.app).
        get('/').
        end((err, res) => {
          should.ifError(err);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('routes');
          var routes = res.body.routes;
          routes.should.include('GET /');
          routes.should.include('GET /users/:id');
          routes.should.include('POST /users');
          done();
        });
    });
  });
});
