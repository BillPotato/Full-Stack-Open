const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const { initialUsers, usersInDb, deepStrictEqualWithoutId } = require("./user_api_helper.js")
const supertest = require("supertest")
const mongoose = require("mongoose")

const User = require("../models/User.js")
const app = require("../App.js")

const api = supertest(app)

describe("With some initial users", () => {
	beforeEach(async () => {
		await User.deleteMany({})

		for (let user of initialUsers) {
			const userObj = new User(user)
			await userObj.save()
		}
	})

	describe("GET tests", () => {
		test("Get all notes", async () => {
			const response = await api
				.get("/api/users")
				.expect("Content-Type", /application\/json/)

			const users = response.body

			for (let i = 0; i < initialUsers.length; i++) {
				const user = initialUsers[i]
				const userInDb = users[i]

				delete user.password
				delete userInDb.id

				assert.deepStrictEqual(userInDb, user)
			}
		})
	})

	describe("POST tests", () => {
		test("One fulfilled request", async () => {
			const usersAtStart = await usersInDb()

			const newUser = {
				username: "BadBoy",
				name: "Trevor",
				password: "987654321"
			}

			const response = await api
				.post("/api/users")
				.send(newUser)
				.expect(201)
				.expect("Content-Type", /application\/json/)

			delete newUser.password

			// check response content
			const userInResponse = response.body
			deepStrictEqualWithoutId(userInResponse, newUser)

			// check db content
			const users = await usersInDb()
			const userInDb = users[users.length-1]
			deepStrictEqualWithoutId(userInDb, newUser)

		})


		test("Missing password / username", async () => {
			const userToAdd1 = {
				name: "Bao",
				password: "123"
			}
			const userToAdd2 = {
				username: "bao123",
				name: "Bao Boy",
			}

			await api
				.post("/api/users")
				.send(userToAdd1)
				.expect(400)
				.expect({error: "missing username/password"})
			const usersAtEnd1 = await usersInDb()
			assert.strictEqual(usersAtEnd1.length, initialUsers.length)

			await api
				.post("/api/users")
				.send(userToAdd2)
				.expect(400)
				.expect({error: "missing username/password"})
			const usersAtEnd2 = await usersInDb()
			assert.strictEqual(usersAtEnd2.length, initialUsers.length)	
		})


		test("Too short password / username", async () => {
			const userToAdd1 = {
				username: "bi",
				name: "Bao",
				password: "123"
			}
			const userToAdd2 = {
				username: "bao123",
				name: "Bao Boy",
				password: "32"
			}

			await api
				.post("/api/users")
				.send(userToAdd1)
				.expect(400)
			const usersAtEnd1 = await usersInDb()
			assert.strictEqual(usersAtEnd1.length, initialUsers.length)

			await api
				.post("/api/users")
				.send(userToAdd2)
				.expect(400)
			const usersAtEnd2 = await usersInDb()
			assert.strictEqual(usersAtEnd2.length, initialUsers.length)
		})


		test("Duplicate username", async () => {
			userToAdd = {
				username: "billbill",
				password: "567"
			}

			await api
				.post("/api/users")
				.send(userToAdd)
				.expect(400)
			const usersAtEnd = await usersInDb()	
			assert.strictEqual(initialUsers.length, usersAtEnd.length)
		})
	})
})

after(async () => {
	await mongoose.connection.close()
})