exports.getLogin = (req, res, next) => {
  // const isLoggedIn =
  //   req.get("Cookie").split(";")[1].trim().split("=")[1] === "true"
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn
  })
}

exports.postLogin = (req, res) => {
  req.isLoggedIn = true
  res.setHeader("Set-Cookie", "loggedIn=true HttpOnly")
  res.redirect("/")
}