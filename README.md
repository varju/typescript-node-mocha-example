# TypeScript Node Mocha Example

Simple project to explore the best way of laying out a TypeScript-based Node.js project.  Uses [express](http://expressjs.com/) to expose a REST API, [Mongo](http://mongodb.github.io/node-mongodb-native/) for persistence, and [Mocha](http://visionmedia.github.io/mocha) to test the API.

## Demo endpoints

```
curl http://localhost:9650/
```

```
curl -X POST http://localhost:9650/users -H "Content-Type: application/json" -d '{ "name": "my user" }'
```

```
curl http://localhost:9650/users/522a658e29eae2b52a000001
```

# TODO

- Fix Mongo so it's only opening database connection once for the life of the application
- Replace raw Mongo with Mongoose
