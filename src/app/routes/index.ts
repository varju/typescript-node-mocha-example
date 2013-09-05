/// <reference path='../../../app.d.ts' />

export function index(req:ExpressServerRequest, res:ExpressServerResponse) {
  res.send({ hello: 'world' });
}
