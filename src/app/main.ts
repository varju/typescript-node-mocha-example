/// <reference path='../../ts-definitions/restify.d.ts' />

import server = require('server');

var s = server.createServer();
s.listen(9650, function () {
  console.log('%s listening at %s', s.name, s.url);
});
