const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const errorController = require("./controllers/error")
const mongoConnect = require("./utils/database").mongoConnect
//Models
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
  User.findById("65b8d12e3819a54d6a7313a6")
    .then(user => {
      req.user = new User(user._id, user.name, user.email, user.cart)
      next()
    })
    .catch(err => console.log(err))
})

app.use(errorController.get404)
mongoConnect(() => app.listen(5000))
