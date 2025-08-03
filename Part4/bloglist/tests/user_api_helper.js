const User = require("../models/User.js")
const assert = require("node:assert")

const initialUsers = [
	{
		username: "billbill",
		name: "Bill",
		password: "helloworld123",
	},
	{
		username: "potatoboy",
		name: "Boy",
		password: "ilovepotato",
	}
]

const usersInDb = async () => {
	const users = await User.find({})

	return users.map(user => user.toJSON())
}

const deepStrictEqualWithoutId = (user1, user2) => {
	if (user1.id) {
		delete user1.id
	}
	if (user2.id) {
		delete user2.id
	}

	assert.deepStrictEqual(user1, user2)
}

module.exports = {
	initialUsers,
	usersInDb,
	deepStrictEqualWithoutId
}