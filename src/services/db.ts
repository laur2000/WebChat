import { MongoClient, Db } from "mongodb";
import config from "../config";
const assert = require("assert");

const url = `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@localhost:27017`;
export var db: Db;
export async function initDB() {
  MongoClient.connect(url, function (err, client) {
    //If there is an error connecting to the database, abort app
    assert.equal(null, err);
    console.log("Connected successfully to database");

    db = client.db(config.DB_NAME);
  });
}
