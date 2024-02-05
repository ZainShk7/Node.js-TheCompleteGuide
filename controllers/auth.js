const User = require("../models/user")
exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get("Cookie").split(";")[1].trim().split("=")[1] === "true"
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false
  })
}

exports.postLogin = (req, res) => {
  User.findById("65bff2cd14bf2eec3b44945e")
    .then(user => {
      req.session.user = user
      req.session.isLoggedIn = true
      req.session.save(err => {
        console.log(err)
        res.redirect("/")
      })
    })
    .catch(err => console.log(err))
  // res.setHeader("Set-Cookie", "loggedIn=true HttpOnly")
}

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
}
