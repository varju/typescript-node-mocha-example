/// <reference path='../../app.d.ts' />

import express = require('express');

import routes = require('./routes/index');
import config = require('./config');

export var app = express();

// all environments
app.set('port', config.props.server.port);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
