const supertest = require("supertest")
const app = require("../app.js")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")

const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const logger = require("../utils/logger.js")

const initialBlogs = [
	{
		"title": "Sample 1",
	    "author": "Bill",
	    "url": "https://idontknowhowtowriteurl1",
	    "likes": 12,
	},
	{
		"title": "Sample 2",
	    "author": "Billy",
	    "url": "https://idontknowhowtowriteurl2",
	    "likes": 50,
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of initialBlogs) {
		const blogObject = Blog(blog)
		await blogObject.save()
	}
})

const api = supertest(app)

test("GET /api/blogs", async () => {
	const response = await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/)

	const blogs = response.body
	// logger.info(blogs)

	assert.strictEqual(blogs.length, initialBlogs.length)	
})

after(async () => {
	await mongoose.connection.close()
})