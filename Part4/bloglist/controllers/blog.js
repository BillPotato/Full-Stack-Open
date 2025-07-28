const blogRouter = require("express").Router()
const Blog = require("../models/blog.js")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blogToAdd = request.body

  // make default like = 0
  if (!blogToAdd.likes) {
    blogToAdd.likes = 0
  }

  const blog = new Blog(blogToAdd)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter