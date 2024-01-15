const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const errorController = require("./controllers/error")
const sequelize = require("./utils/database")
//Models
const Product = require("./models/product")
const User = require("./models/user")

const app = express()
//telling express that we are using template engine and where to fine it
app.set("view engine", "ejs")
app.set("views", "views")
//own router file import
const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)
app.use(shopRoutes)
app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use(errorController.get404)

//Associations / Relations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" })

User.hasMany(Product)

sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1)
    // console.log("Sequelize DB (MySQL) Connection Successful")
    // app.listen(5000)
  })
  .then(user => {
    if (!user) {
      return User.create({
        name: "Sheikh",
        email: "sheikh@yahoo.com",
        password: "sheikhoo"
      })
    }
    return user
  })
  .then(user => {
    app.listen(5000)
    console.log("Listening on Port 5000")
    console.log("|| USER ||", user)
  })
  .catch(err => {
    console.log("Failed to Connect to Sequelize Database:::", err)
  })
