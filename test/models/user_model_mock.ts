/// <reference path='../test.d.ts' />

import mongooseMock = require('./mongoose_mock');
import userModel = require('../../app/models/user_model');

var User = userModel.User;

export class UserMock extends mongooseMock.MongooseMock {
  constructor() {
    super(User);
  }
}
