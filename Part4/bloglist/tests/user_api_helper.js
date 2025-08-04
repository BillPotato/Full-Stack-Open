const User = require("../models/user.js")
const assert = require("node:assert")

const initialUsers = [
	{
		username: "billbill",
		name: "Bill",
		password: "123"
	},
	{
		username: "potatoboy",
		name: "Boy",
		password: "123"
	}
]

const usersInDb = async () => {
	const users = await User.find({})

	return users.map(user => user.toJSON())
}

const assertUsers = (user1, user2) => {
	assert.strictEqual(user1.username, user2.username)
	if (user1.name || user2.name) {
		assert.strictEqual(user1.name, user2.name)
	}
}

module.exports = {
	initialUsers,
	usersInDb,
	assertUsers
}