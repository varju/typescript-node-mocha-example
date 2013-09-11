/// <reference path='../app.d.ts' />

import fs = require('fs');

module.exports = (app:ExpressApplication) => {
  // load all the other controllers in this directory
  fs.readdirSync(__dirname).
    filter((file) => {
      return file !== "index.js" && (/.js$/).test(file);
    }).
    forEach((file) => {
      var name = file.substr(0, file.indexOf('.'));
      require('./' + name)(app);
    });

  // define our root controller
  app.get('/', (req, res) => {
    var allRoutes = [];
    for (var method in app.routes) {
      var methodRoutes = app.routes[method];
      for (var i = 0; i < methodRoutes.length; i++) {
        var route = methodRoutes[i];
        allRoutes.push(method.toUpperCase() + " " + route.path);
      }
    }

    res.send({ routes: allRoutes });
  });
}
