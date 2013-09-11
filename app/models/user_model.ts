/// <reference path='../app.d.ts' />

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

export var User = mongoose.model('users', userSchema);
