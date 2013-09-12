/// <reference path='../app.d.ts' />

var asyncblock = require('asyncblock');

import User = require('../../app/models/user_model');

module.exports = (app:ExpressApplication) => {

  app.post('/users', (req, res, next) => {
    asyncblock((flow) => {
      flow.errorCallback = next;

      var userTemplate = req.body;
      new User(userTemplate).validate().sync();

      var user = User.create(userTemplate).sync();
      res.send(201, { id: user.id });
    });
  });

  app.get('/users/:id', (req, res, next) => {
    asyncblock((flow) => {
      flow.errorCallback = next;

      var id = req.param('id');
      var user = User.findById(id).sync();
      if (null === user) {
        res.send(404);
      } else {
        res.status(200).send({
          id: user.id,
          name: user.name
        });
      }
    });
  });

};
