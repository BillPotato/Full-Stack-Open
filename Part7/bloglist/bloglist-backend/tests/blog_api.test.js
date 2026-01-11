const supertest = require("supertest")
const app = require("../app.js")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const { initialBlogs, blogsInDb, generateToken } = require("./blog_api_helper.js")

const { test, describe, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const logger = require("../utils/logger.js")

const api = supertest(app)

describe("With initial blogs", async () => {

	const token = await generateToken()
	// also generates user Admin

	beforeEach(async () => {
		await Blog.deleteMany({})
		const admin = await User.findOne({username: "Admin"})
		admin.blogs = []

		for (let blog of initialBlogs) {
			blog.user = admin._id
			const blogObject = Blog(blog)
			const savedBlog = await blogObject.save()

			admin.blogs = admin.blogs.concat(savedBlog.id)
			await admin.save()
		}
	})

	describe("GET tests", () => {
		test("GET /api/blogs", async () => {
			const response = await api
				.get("/api/blogs")
				.expect(200)
				.expect("Content-Type", /application\/json/)

			const blogs = response.body
			// logger.info(blogs)

			assert.strictEqual(blogs.length, initialBlogs.length)	
		})

		test("Identifier is named id, not _id", async () => {
			const response = await api
				.get("/api/blogs")

			const blogs = response.body

			for (let blog of blogs) {
				assert( ("id" in blog) && !("_id" in blog) )
			}
		})
	})

	describe("POST tests", () => {

		test("POST /api/blogs", async () => {
			const blogsAtStart = await blogsInDb()

			const blogToAdd = {
				"title": "Sample 3",
			    "url": "https://idontknowhowtowriteurl3",
			    "likes": 420,
			}

			// check response
			const postResponse = await api
				.post("/api/blogs")
				.set("Authorization", token)
				.send(blogToAdd)
				.expect(201)
				.expect("Content-Type", /application\/json/)

			// check one new note
			const blogsAtEnd = await blogsInDb()
			assert.strictEqual(blogsAtEnd.length, blogsAtStart.length+1)

			// check title
			const titles = blogsAtEnd.map(blog => blog.title)	
			assert(titles.includes(blogToAdd.title))
		})

		test("Default like of 0", async () => {
			const blogToAdd = {
				"title": "Sample 4",
			    "url": "https://idontknowhowtowriteurl4",
			}

			const response = await api
				.post("/api/blogs")	
				.set("Authorization", token)
				.send(blogToAdd)
				.expect(201)

			const newBlog = await Blog.findOne({
				"title": "Sample 4",
			    "url": "https://idontknowhowtowriteurl4",
			})

			assert.strictEqual(newBlog.likes, 0)
		})

		test("Missing title/url results in code 400", async () => {
			const blogsToAdd = [
				{
				    "url": "https://idontknowhowtowriteurl4",
				    "likes": 1,
				},
				{
					"title": "Sample 5",
				    "likes": 2,
				},
				{
				    "likes": 3,
				}
			]
			
			for (let blog of blogsToAdd) {
				const response = await api
					.post("/api/blogs")
					.send(blog)
					.set("Authorization", token)
					.expect(400)
					.expect({"error": "missing parameters"})

				// logger.info(blog)

				const blogInDBList = await Blog.find(blog)
				// logger.info(blogInDBList)
				assert(blogInDBList.length === 0)
			}
		})

		test("Missing token", async () => {
			const blogToAdd = {
				"title": "Sample 3",
			    "url": "https://idontknowhowtowriteurl3",
			    "likes": 420,
			}

			await api
				.post("/api/blogs")
				.send(blogToAdd)
				.expect(401)
				.expect({error: "invalid token"})
		})
	})

	describe("DELETE tests", () => {
		test("Deleting an existing blog", async () => {
			// use data in db otherwise broken GET request can affect other tests
			const blogsAtStart = await blogsInDb()
			const id = blogsAtStart[0].id

			const admin = await User.find({username: "Admin"})

			await api
				.delete(`/api/blogs/${id}`)
				.set("Authorization", token)
				.expect(204)

			const deletedBlog = await Blog.findById(id)
			assert(!deletedBlog)
		})

		// test("Deleting a nonexistent blog", async () => {
		// 	const blogsAtStart = await blogsInDb()

		// 	await api
		// 		.delete("/api/blogs/111fd6c9a4317f36089f961")
		// 		.set("Authorization", token)
		// 		.expect(400)
		// 		.expect({"error": "invalid ID"})

		// 	const blogsAtEnd = await blogsInDb()
		// 	// logger.info(blogsAfterDeletion)

		// 	assert.deepStrictEqual(blogsAtEnd, blogsAtStart)
		// })
	})

	describe("PUT tests", () => {
		test("Updating likes of a note", async () => {
			const blogsAtStart = await blogsInDb()

			const id = blogsAtStart[0].id
			const updatedBlog = {
				...blogsAtStart[0],
				"likes": 987654321,
			}

			await api
				.put(`/api/blogs/${id}`)
				.send(updatedBlog)
				.expect(200)
				.expect(updatedBlog)

			const updatedBlogInDb = await Blog.findById(id)
			assert.deepStrictEqual(updatedBlogInDb.toJSON(), updatedBlog)
		})
	})
})

after(async () => {
	await mongoose.connection.close()
})