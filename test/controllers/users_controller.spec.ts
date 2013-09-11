/// <reference path='../test.d.ts' />

import should = require('should');
import request = require('supertest');

import server = require('../../app/server');
import userModelMock = require('../models/user_model_mock');

describe('users controller', () => {
  var userMock = new userModelMock.UserMock();
  userMock.register();

  describe('POST /users', () => {
    it('should create a user', (done) => {
      userMock.allowValidate();
      userMock.allowCreate({ id: 'mockId'});

      request(server.app).
        post('/users').
        send({ name: 'my user' }).
        end((err, res) => {
          should.ifError(err);
          res.should.have.status(201);
          res.should.be.json;
          res.body.id.should.eql('mockId');
          done();
        });
    });

    it('should fail if the name is missing', (done) => {
      userMock.failValidate();

      request(server.app).
        post('/users').
        send({}).
        end((err, res) => {
          should.ifError(err);
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.eql({ error: 'ValidationError: Validator \"mockerr\" failed for path mockpath' });
          done();
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should load a user', (done) => {
      var user = {name: 'fred', id: '123'};
      userMock.allowFindById(user);

      request(server.app).
        get('/users/' + user.id).
        end((err, res) => {
          should.ifError(err);
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.eql(user);
          done();
        });
    });

    it("should fail if the user doesn't exist", (done) => {
      userMock.allowFindById(null);

      request(server.app).
        get('/users/000000000000000000000000').
        end((err, res) => {
          should.ifError(err);
          res.should.have.status(404);
          done();
        });
    });

    it("should fail if mongo is down", (done) => {
      userMock.failFindById();

      request(server.app).
        get('/users/000000000000000000000000').
        end((err, res) => {
          should.ifError(err);
          res.should.have.status(500);
          done();
        });
    });
  });
});
