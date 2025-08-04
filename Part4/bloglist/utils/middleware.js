const jwt = require("jsonwebtoken")
const User = require("../models/user.js")

const tokenExtractor = async (request, response, next) => {
	const authorization = request.get("authorization")
	if (authorization && authorization.startsWith("Bearer ")) {

		const token = authorization.replace("Bearer ", "")
		const decodedToken = jwt.verify(token, process.env.SECRET)
		const user = await User.findById(decodedToken.id)

		request.user = user
	}
	else {
		request.user = null
	}

	next()
}

module.exports = {
	tokenExtractor
}