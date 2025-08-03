const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: 3,
		unique: true,
	},
	passwordHash: String,
	name: String,
})

userSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = document._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.passwordHash
	}
})

const User = mongoose.model("User", userSchema)

module.exports = User