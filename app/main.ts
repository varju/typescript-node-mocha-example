/// <reference path='./app.d.ts' />

import http = require('http');
import server = require('./server');

http.createServer(server.app).listen(server.app.get('port'), () => {
  console.log('Express server listening on port ' + server.app.get('port'));
});
