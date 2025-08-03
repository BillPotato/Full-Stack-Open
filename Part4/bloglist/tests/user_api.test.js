const { test, describe, beforeEach, after } = require("node:test")
const assert = require("node:assert")
const { initialUsers, usersInDb, assertUsers } = require("./user_api_helper.js")
const supertest = require("supertest")

const mongoose = require("mongoose")
const User = require("../models/user.js")
const app = require("../App.js")
const bcrypt = require("bcrypt")

const api = supertest(app)

describe("With some initial users", () => {
	beforeEach(async () => {
		await User.deleteMany({})

		for (let user of initialUsers) {
			const passwordHash = await bcrypt.hash(user.password, 2)
			const userToAdd = {
				username: user.username,
				name: user.name,
				passwordHash 
			}
			const userObj = new User(userToAdd)
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
				assertUsers(users[i], initialUsers[i])
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

			// check response content
			assertUsers(response.body, newUser)

			// check db content
			const usersAtEnd = await usersInDb()
			const userInDb = usersAtEnd[usersAtEnd.length-1]
			assertUsers(userInDb, newUser)

		})


		test("Missing password / username", async () => {
			const usersAtStart = await usersInDb()
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
			assert.deepStrictEqual(usersAtEnd1, usersAtStart)

			await api
				.post("/api/users")
				.send(userToAdd2)
				.expect(400)
				.expect({error: "missing username/password"})
			const usersAtEnd2 = await usersInDb()
			assert.deepStrictEqual(usersAtEnd2, usersAtStart)	
		})


		test("Too short password / username", async () => {
			const usersAtStart = await usersInDb()
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
			assert.deepStrictEqual(usersAtEnd1, usersAtStart)

			await api
				.post("/api/users")
				.send(userToAdd2)
				.expect(400)
			const usersAtEnd2 = await usersInDb()
			assert.deepStrictEqual(usersAtEnd2, usersAtStart)
		})


		test("Duplicate username", async () => {
			const usersAtStart = await usersInDb()
			userToAdd = {
				username: "billbill",
				password: "567"
			}

			await api
				.post("/api/users")
				.send(userToAdd)
				.expect(400)
			const usersAtEnd = await usersInDb()	
			assert.deepStrictEqual(usersAtEnd, usersAtStart)
		})
	})
})

after(async () => {
	await mongoose.connection.close()
})