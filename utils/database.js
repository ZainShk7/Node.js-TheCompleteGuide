const mongodb = require("mongodb")
const MONGODB_URL = "mongodb://localhost:27017/shop"
const mongoClient = mongodb.MongoClient
let _db

const mongoConnect = callback => {
  mongoClient
    .connect(MONGODB_URL)
    .then(client => {
      console.log("MongoDB Connected!")
      _db = client.db()
      callback(client)
    })
    .catch(err => console.log(err))
}

const getDb = () => {
  if (_db) {
    return _db
  }
  throw "No database found!"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
