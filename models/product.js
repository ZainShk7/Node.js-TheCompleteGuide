const Sequelize = require("sequelize")

const sequelize = require("../utils/database")

const product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  imageUrl: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  description: Sequelize.STRING,
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE
})

module.exports = product
