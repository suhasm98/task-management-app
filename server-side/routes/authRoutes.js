const express = require("express")
const { body, validationResult } = require("express-validator")
const router = express.Router()
const {
  signup,
  login,
} = require("../controllers/authController")

// Middleware to handle validation results
const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)))
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }
}

// Validation rules
const signupValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("role").optional().isIn(["user", "admin"]).withMessage("Invalid role"),
]

const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
]

// Routes
router.post("/signup", validate(signupValidation), signup)
router.post("/login", validate(loginValidation), login)

module.exports = router
