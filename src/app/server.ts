/// <reference path='../../app.d.ts' />

import restify = require('restify');
import rootController = require('controllers/root');

export function createServer():Server {
  var server = restify.createServer();
  server.use(restify.bodyParser());

  server.get('/', rootController.helloWorld);

  return server;
}
