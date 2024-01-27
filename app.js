const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")

const errorController = require("./controllers/error")
const mongoConnect = require("./utils/database").mongoConnect
//Models

const app = express()
//telling express that we are using template engine and where to fine it
app.set("view engine", "ejs")
app.set("views", "views")
//own router file import
const adminRoutes = require("./routes/admin")
// const shopRoutes = require("./routes/shop")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use("/admin", adminRoutes)
// app.use(shopRoutes)
app.use((req, res, next) => {
  next()
})

app.use(errorController.get404)
mongoConnect(() => app.listen(5000))
