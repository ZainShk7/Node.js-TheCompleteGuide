const getDb = require("../utils/database").getDb

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }
  save() {
    const db = getDb()
    return db
      .collection("products")
      .insertOne(this)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// const product = sequelize.define("product", {
//   id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   title: Sequelize.STRING,
//   imageUrl: Sequelize.STRING,
//   price: Sequelize.DOUBLE,
//   description: Sequelize.STRING,
//   createdAt: Sequelize.DATE,
//   updatedAt: Sequelize.DATE
// })

module.exports = Product
