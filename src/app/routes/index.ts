/// <reference path='../../../app.d.ts' />

import express = require("express")

export function index(req:ExpressServerRequest, res:ExpressServerResponse) {
  res.send({ hello: 'world' });
}
