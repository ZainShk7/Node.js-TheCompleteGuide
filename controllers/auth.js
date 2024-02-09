const bcrypt = require("bcryptjs")
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

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
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

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        return res.redirect("/signup")
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          })
          return user.save()
        })
        .then(() => {
          res.redirect("/login")
        })
    })
    .catch(err => console.log("err"))
}

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/")
  })
}
