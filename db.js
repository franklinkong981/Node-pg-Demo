const {Client} = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgres://franklinkong981:123456789@127.0.0.1:5432/usersdb_test";
} else {
  DB_URI = "postgres://franklinkong981:123456789@127.0.0.1:5432/usersdb";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;