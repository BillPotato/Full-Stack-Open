const supertest = require("supertest")
const app = require("../app.js")
const mongoose = require("mongoose")
const Blog = require("../models/blog.js")

const { test, describe, after, beforeEach } = require("node:test")
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

const api = supertest(app)

describe("With initial blogs", () => {

	beforeEach(async () => {
		await Blog.deleteMany({})

		for (let blog of initialBlogs) {
			const blogObject = Blog(blog)
			await blogObject.save()
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

		test("Default like of 0", async () => {
			const blogToAdd = {
				"title": "Sample 4",
			    "author": "Bill Gamer",
			    "url": "https://idontknowhowtowriteurl4",
			}

			await api
				.post("/api/blogs")	
				.send(blogToAdd)

			const newBlogList = await Blog.find({
				"title": "Sample 4",
			    "author": "Bill Gamer",
			    "url": "https://idontknowhowtowriteurl4",
			})
			// logger.info(newBlog)

			assert.strictEqual(newBlogList[0].likes, 0)
		})

		test("Missing title/url results in code 400", async () => {
			const blogsToAdd = [
				{
				    "author": "Bill1",
				    "url": "https://idontknowhowtowriteurl4",
				    "likes": 1,
				},
				{
					"title": "Sample 5",
				    "author": "Bill2",
				    "likes": 2,
				},
				{
				    "author": "Bill3",
				    "likes": 3,
				}
			]
			
			for (let blog of blogsToAdd) {
				const response = await api
					.post("/api/blogs")
					.send(blog)
					.expect(400) // add content checking
					.expect({"error": "missing parameters"})

				// logger.info(blog)

				const blogInDBList = await Blog.find(blog)
				// logger.info(blogInDBList)
				assert(blogInDBList.length === 0)
			}
		})
	})

	describe("DELETE tests", () => {
		test("Deleting an existing blog", async () => {
			// use data in db otherwise broken GET request can affect other tests
			const blogs = await Blog.find({})
			const id = blogs[0]._id

			await api
				.delete(`/api/blogs/${id}`)
				.expect(204)

			const deletedBlog = await Blog.findById(id)
			assert(!deletedBlog)
		})

		test("Deleting a nonexistent blog", async () => {
			await api
				.delete("/api/blogs/1")
				.expect(400)
				.expect({"error": "invalid ID"})

			const blogsAfterDeletion = await Blog.find({})
			// logger.info(blogsAfterDeletion)

			assert.strictEqual(blogsAfterDeletion.length, initialBlogs.length)
		})
	})
})

after(async () => {
	await mongoose.connection.close()
})