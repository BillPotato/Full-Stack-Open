const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose.connect(url)
	.then(res => {
		console.log("MONGODB connection success")
	})
	.catch(err => {
		console.log("MONGODB connection failed")
	})

// const personSchema = new mongoose.Schema({
// 	name: String,
// 	number: String,
// })

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true,
	},
	number: {
		type: String,
		minLength: 8,
		required: true,
		validate: number => {
			const pattern = /^\d{2,3}-\d+$/
			return pattern.test(number)
		}
	}
})

personSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = document._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person