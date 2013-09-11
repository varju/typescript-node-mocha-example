/// <reference path='../test.d.ts' />

var sinon = require('sinon');
var mongoose = require('mongoose');

export class MongooseMock {
  modelToMock:any;

  constructor(modelToMock:any) {
    this.modelToMock = modelToMock;
  }

  sandbox:any;
  instanceMock:any;
  classMock:any;

  /**
   * replace the model with a mock implementation
   */

  public register() {
    var _this = this;

    beforeEach(() => {
      _this.sandbox = sinon.sandbox.create();

      _this.instanceMock = _this.sandbox.mock(_this.modelToMock.prototype);
      _this.classMock = _this.sandbox.mock(_this.modelToMock);
    });

    afterEach(() => {
      _this.instanceMock.verify();
      _this.classMock.verify();

      _this.sandbox.restore();
    });
  }

  /*
   * instance mocks
   */

  allowValidate() {
    this.instanceMock.expects('validate').once().callsArgAsync(0);
  }

  failValidate() {
    var error = new mongoose.Error.ValidationError({});
    error.errors = { mock: new mongoose.Error.ValidatorError('mockpath', 'mockerr') };
    this.instanceMock.expects('validate').once().callsArgWithAsync(0, error);
  }

  /*
   * class mocks
   */

  allowCreate(result) {
    this.classMock.expects('create').once().callsArgWithAsync(1, null, result);
  }

  allowFindById(result) {
    this.classMock.expects('findById').once().callsArgWithAsync(1, null, result);
  }

  failFindById() {
    this.classMock.expects('findById').callsArgWithAsync(1, new Error('not found'));
  }
}
