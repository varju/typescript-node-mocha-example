/// <reference path='../../app.d.ts' />

import express = require('express');
import routes = require('./routes/index');

export var app = express();

// all environments
app.set('port', process.env.PORT || 9650);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
