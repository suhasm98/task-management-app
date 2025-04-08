const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const role = req.body.role || "user" // optional
    const user = new User({ email, password: hashedPassword, role })
    await user.save()
    res.status(201).json({ message: "User created successfully" })
  } catch (err) {
    res.status(500).json({ message: "Error creating user" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: "Invalid credentials" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" })

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })
    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: "Login failed" })
  }
}

// exports.refreshTokenHandler = (req, res) => {
//   const token = req.cookies.refreshToken
//   if (!token) return res.status(401).json({ message: "No refresh token" })

//   jwt.verify(token, process.env.REFRESH_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid refresh token" })

//     const accessToken = generateAccessToken({ _id: decoded.userId })
//     res.json({ accessToken })
//   })
// }
