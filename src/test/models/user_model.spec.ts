/// <reference path='../../../app.d.ts' />

import assert = require('assert');
import userModel = require('../../app/models/user_model')

describe('users model', () => {
  describe('create', () => {
    it("should return the new user's id", (done) => {
      userModel.create('my name', (err, user) => {
        assert.ifError(err);
        assert.equal('my name', user.name);
        assert.ok(user.id, 'bad id ' + user.id);
        done();
      });
    });
  });

  describe('get', () => {
    it("should load a record", (done) => {
      userModel.create('name', (err, user) => {
        assert.ifError(err);
        userModel.get(user.id, (err, user1) => {
          assert.ifError(err);
          assert.deepEqual(user, user1);
          done();
        });
      });
    });

    it("should return null if the record doesn't exist", (done) => {
      userModel.get('000000000000000000000000', (err, user) => {
        assert.ifError(err);
        assert.equal(null, user);
        done();
      });
    });
  });
});
