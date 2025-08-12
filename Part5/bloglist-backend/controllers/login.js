const loginRouter = require("express").Router()
const User = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


loginRouter.post("/", async (request, response) => {
	const { username, password } = request.body

	const user = await User.findOne({username})

	const passwordCorrect = !user
		? false
		: await bcrypt.compare(password, user.passwordHash)

	if (!user || !passwordCorrect) {
		return response.status(401).json({error: "incorrect username/password"})
	}

	const userForToken = {
		username: user.name,
		id: user._id
	}

	const token = jwt.sign(userForToken, process.env.SECRET)

	response.json({
		username: user.username,
		name: user.name,
		id: user._id.toString(),
		token: token
	})
})

module.exports = loginRouter