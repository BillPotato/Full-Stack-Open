const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const supertest = require("supertest")
const app = require("../app.js")

const api = supertest(app)

const initialBlogs = [
	{
		"title": "Sample 1",
	    "author": "Admin",
	    "url": "https://idontknowhowtowriteurl1",
	    "likes": 12,
	},
	{
		"title": "Sample 2",
	    "author": "Admin",
	    "url": "https://idontknowhowtowriteurl2",
	    "likes": 50,
	}
]

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	const blogJson = blogs.map(blog => blog.toJSON())

	return blogJson
}

const generateToken = async () => {
	// note: generates a Bearer token
	// note: dependent on login request

	await User.deleteMany({})

	// create admin user
	const admin = {
		username: "Admin",
		password: "123"
	}
	await api
		.post("/api/users")
		.send(admin)

	// get admin's token
	const response = await api
		.post("/api/login")
		.send(admin)

	return `Bearer ${response.body.token}`
}

module.exports = {
	initialBlogs,
	blogsInDb,
	generateToken
}