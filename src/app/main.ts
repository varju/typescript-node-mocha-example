/// <reference path='../../app.d.ts' />

import http = require('http');
import server = require('./server');

var app = server.app;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
