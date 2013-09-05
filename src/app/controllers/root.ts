/// <reference path='../../../app.d.ts' />

export function helloWorld(req:Request, res:Response, next:Function) {
  res.send({ hello: 'world' });
}
