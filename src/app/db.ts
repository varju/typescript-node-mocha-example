import mongodb = require('mongodb');

import config = require("./config");

export function open(callback:(err, db) => void) {
  // TODO - why is mongo hanging when w=1?
  var db = new mongodb.Db(config.props.mongo.database, new mongodb.Server(config.props.mongo.host, config.props.mongo.port), {w: "0"});
  db.open((err, db) => {
    if (err) callback(err, null);
    else callback(null, db);
  });
}
