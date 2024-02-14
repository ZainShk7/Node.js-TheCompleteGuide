const bcrypt = require("bcryptjs")
const User = require("../models/user")

exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get("Cookie").split(";")[1].trim().split("=")[1] === "true"
  let message = req.flash("error")
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: message
  })
}

exports.getSignup = (req, res) => {
  let message = req.flash("error")
  if (message.length > 0) {
    message = message[0]
  } else {
    message = null
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    errorMessage: message
  })
}

exports.postLogin = (req, res) => {
  const { email, password } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid email/password")
        return res.redirect("/login")
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.user = user
            req.session.isLoggedIn = true
            return req.session.save(err => {
              console.log(err)
              res.redirect("/")
            })
          }
          req.flash("error", "Invalid email/password")
          return res.redirect("/login")
        })
        .catch(err => {
          console.log(err)
          res.redirect("/login")
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
        req.flash("error", "E-mail already exist")
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
