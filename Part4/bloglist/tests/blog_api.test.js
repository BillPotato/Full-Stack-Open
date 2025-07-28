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

test("Unique identifier is named id, not _id", async () => {
	const response = await api
		.get("/api/blogs")

	const blogs = response.body

	for (let blog of blogs) {
		assert( ("id" in blog) && !("_id" in blog) )
	}
})

test("POST /api/blogs", async () => {
	const blogToAdd = {
		"title": "Sample 3",
	    "author": "Bill Gates",
	    "url": "https://idontknowhowtowriteurl3",
	    "likes": 420,
	}

	// check response
	const postResponse = await api
		.post("/api/blogs")
		.send(blogToAdd)
		.expect(201)
		.expect("Content-Type", /application\/json/)

	// check one new note
	const response = await api.get("/api/blogs")
	const blogs = response.body

	assert.strictEqual(blogs.length, initialBlogs.length+1)

	// check title
	const titles = blogs.map(blog => blog.title)	

	assert(titles.includes(blogToAdd.title))
})

test("Blogs have default like of 0", async () => {
	const blogToAdd = {
		"title": "Sample 4",
	    "author": "Bill Gamer",
	    "url": "https://idontknowhowtowriteurl4",
	}

	await api
		.post("/api/blogs")	
		.send(blogToAdd)

	const newBlog = await Blog.find({
		"title": "Sample 4",
	    "author": "Bill Gamer",
	    "url": "https://idontknowhowtowriteurl4",
	})
	// logger.info(newBlog)

	assert.strictEqual(newBlog[0].likes, 0)
})

after(async () => {
	await mongoose.connection.close()
})