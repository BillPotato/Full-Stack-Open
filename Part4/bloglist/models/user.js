const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		minLength: 3,
		required: true,
		unique: true,
	},
	passwordHash: {
		type: String,
		required: true,
	},
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