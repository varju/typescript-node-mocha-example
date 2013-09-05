/// <reference path='../../../ts-definitions/restify.d.ts' />

export function helloWorld(req:Request, res:Response, next:Function) {
  res.send({ hello: 'world' });
}
