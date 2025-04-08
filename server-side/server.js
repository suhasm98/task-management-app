const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const helmet = require("helmet")

const rateLimit = require("express-rate-limit")
const authRoutes = require("./routes/authRoutes")
const taskRoutes = require("./routes/taskRoutes")
const healthRoutes = require("./routes/healthRoutes")

dotenv.config()
const app = express()
const allowedOrigins = [
  "http://localhost:5173",
  "https://velvety-capybara-7e2f9a.netlify.app",
]
// Rate limiter: 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
})
app.use(limiter)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true) // allow Postman/curl
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)
app.use(helmet())

app.use(express.json())

app.use("/api", authRoutes)
app.use("/api", taskRoutes)
app.use("/api", healthRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running on port", process.env.PORT || 3000)
    })
  })
  .catch((err) => console.error(err))

module.exports = app
