const path = require("path")

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const errorController = require("./controllers/error")
const User = require("./models/user")

const app = express()

app.set("view engine", "ejs")
app.set("views", "views")

const adminRoutes = require("./routes/admin")
const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
  User.findById("65bff2cd14bf2eec3b44945e")
    .then(user => {
      req.user = user
      next()
    })
    .catch(err => console.log(err))
})

app.use("/admin", adminRoutes)
app.use(shopRoutes)

app.use(errorController.get404)

mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Demo",
          email: "demoUser@bing.com",
          cart: {
            items: []
          }
        })
        user.save()
      }
    })
    app.listen(5000)
  })
  .catch(err => {
    console.log(err)
  })
