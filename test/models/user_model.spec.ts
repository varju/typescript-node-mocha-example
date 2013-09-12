/// <reference path='../test.d.ts' />

import should = require('should');

import User = require('../../app/models/user_model');

describe('user model', () => {
  beforeEach((done) => {
    // clear the database
    User.remove({}, done);
  });

  describe('create', () => {
    it('should store a new user', (done) => {
      var user = new User({name: 'joe cool'});
      user.save((err, persistedUser) => {
        should.ifError(err);
        persistedUser.name.should.eql('joe cool');
        persistedUser.id.should.match(/^[0-9a-f]{24}$/);

        User.findById(persistedUser.id, (err, foundUser) => {
          foundUser.name.should.eql('joe cool');
          foundUser.id.should.eql(persistedUser.id);
          done();
        });
      });
    });
  });
});
