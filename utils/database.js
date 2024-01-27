const mongodb = require("mongodb")
const MONGODB_URL = "mongodb://localhost:27017/your_database_name"
const mongoClient = mongodb.MongoClient

const mongoConnect = callback => {
  mongoClient
    .connect(MONGODB_URL)
    .then(client => {
      console.log("MongoDB Connected! ")
      callback(client)
    })
    .catch(err => console.log(err))
}

module.exports = mongoConnect
