const Blog = require("../models/blog.js")

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

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	const blogJson = blogs.map(blog => blog.toJSON())

	return blogJson
}

module.exports = {
	initialBlogs,
	blogsInDb
}