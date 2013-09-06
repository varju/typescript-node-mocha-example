/// <reference path='../../../app.d.ts' />

import assert = require('assert');
import request = require('supertest');
import server = require('../../app/server')
import userModel = require('../../app/models/user_model')

describe('users controller', () => {
  describe('/users endpoint', () => {
    it('should create a new user', (done) => {
      request(server.app)
        .post('/users')
        .expect(201)
        .expect('Content-Type', /json/)
        .send({ name: 'my user' })
        .end((err, res) => {
          assert.ifError(err);
          var json:any = res.body;
          assert.ok(json.id.match(/^[0-9a-f]{24}$/));
          done();
        });
    });

    it('should fail if name parameter is missing', (done) => {
      request(server.app)
        .post('/users')
        .expect(400)
        .send({})
        .end((err, res) => {
          assert.ifError(err);
          done();
        });
    });
  });

  describe('/users/:userId endpoint', () => {
    it('should find an existing user', (done) => {
      userModel.create('my user', (err, user) => {
        assert.ifError(err);
        request(server.app)
          .get('/users/' + user.id)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            assert.ifError(err);
            assert.deepEqual(res.body, user);
            done();
          });
      });
    });

    it("should fail if the user doesn't exist", (done) => {
      request(server.app)
        .get('/users/000000000000000000000000')
        .expect(404)
        .end((err, res) => {
          assert.ifError(err);
          done();
        });
    });
  })
});
