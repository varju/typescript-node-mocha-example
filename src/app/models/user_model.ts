/// <reference path='../../../app.d.ts' />

import mongodb = require('mongodb');

import db = require("../db");

export class User {
  id:string;
  name:string;

  constructor(id:string, name:string) {
    this.id = id;
    this.name = name;
  }
}

function openCollection(callback:(err, Collection) => void) {
  db.open((err, db) => {
    if (err) callback(err, null);
    else db.collection('users', (err, collection) => {
      if (err) callback(err, null);
      else callback(null, collection);
    })
  });
}


export function create(name:string, callback:(Error, User) => void) {
  openCollection((err, collection) => {
    if (err) callback(err, null);
    else collection.insert({ name: name }, (err, result) => {
      if (err) callback(err, null);
      else {
        var id = result[0]._id.toString();
        callback(null, new User(id, name));
      }
    });
  });
}

export function get(id:string, callback:(Error, User) => void) {
  openCollection((err, collection) => {
    if (err) callback(err, null);
    else collection.findOne({_id: new mongodb.ObjectID(id)}, (err, result) => {
      if (err) callback(err, null);
      else {
        var user = result == null ? null : new User(result._id.toString(), result.name);
        callback(null, user);
      }
    });
  });
}
