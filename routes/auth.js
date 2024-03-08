const express = require("express")
const { check, body } = require("express-validator/check")

const authController = require("../controllers/auth")
const User = require("../models/user")

const router = express.Router()

router.get("/login", authController.getLogin)

router.get("/signup", authController.getSignup)

router.post("/login", authController.postLogin)

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("please enter a valid email.")
      .custom((value, { req }) => {
        // if (value === "sampleemail@test.com") {
        //   throw new Error("This email address if forbidden.")
        // }
        // return true
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-mail already exist, Try new one")
          }
        })
      }),
    body(
      "password",
      "please enter password that contains no symbol and sould be 5 characters atleast."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords not Matched!")
      }
      return true
    })
  ],
  authController.postSignup
)

router.post("/logout", authController.postLogout)

router.get("/reset", authController.getReset)

router.get("/reset/:token", authController.getNewPassword)

router.post("/new-passsword", authController.postNewPassword)

module.exports = router
