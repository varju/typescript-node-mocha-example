/// <reference path='../test.d.ts' />

import mongooseMock = require('./mongoose_mock');
import User = require('../../app/models/user_model');

export class UserMock extends mongooseMock.MongooseMock {
  constructor() {
    super(User);
  }
}
