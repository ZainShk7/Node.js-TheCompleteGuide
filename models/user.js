const mongodb = require("mongodb")
const getDb = require("../utils/database").getDb
class User {
  constructor(id, name, email, cart) {
    this.id = id
    this.name = name
    this.email = email
    this.cart = cart
  }

  save() {
    const db = getDb()
    return db
      .collection("users")
      .insertOne(this)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  static findById(userId) {
    const db = getDb()
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(userId) })
      .next()
      .then(user => {
        console.log(user)
        return user
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = User
