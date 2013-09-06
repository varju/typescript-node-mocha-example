/// <reference path='../../../app.d.ts' />

import userModel = require('../models/user_model');

export function create(req:ExpressServerRequest, res:ExpressServerResponse) {
  var name = req.body.name;
  if (!name) {
    res.status(400).send('missing "name"');
  } else {
    userModel.create(name, (err, user) => {
      res.status(201).send({id: user.id});
    });
  }
}

export function get(req:ExpressServerRequest, res:ExpressServerResponse) {
  var id = req.param("id");
  userModel.get(id, (err, user) => {
    if (user === null)
      res.send(404);
    else
      res.status(200).send(user);
  });
}
