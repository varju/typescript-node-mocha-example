/// <reference path='../../app.d.ts' />

import express = require('express');

import routeIndex = require('./routes/index');
import userRoutes = require('./routes/user_routes');
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

app.get('/', routeIndex.index);
app.post('/users', userRoutes.create);
app.get('/users/:id', userRoutes.get);
