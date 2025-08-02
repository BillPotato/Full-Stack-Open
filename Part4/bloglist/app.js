const config = require("./utils/config.js")
const express = require("express")
const mongoose = require("mongoose")
const blogRouter = require("./controllers/blog.js")
const userRouter = require("./controllers/user.js")

const app = express()

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)

module.exports = app