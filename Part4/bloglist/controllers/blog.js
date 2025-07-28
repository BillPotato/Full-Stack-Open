const blogRouter = require("express").Router()
const Blog = require("../models/blog.js")

const logger = require("../utils/logger.js")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blogToAdd = request.body

  // check title & url
  if (!blogToAdd.title || !blogToAdd.url) {
    return response.status(400).json({"error": "missing parameters"})
  }
  // logger.info("got past title")

  // make default like = 0
  if (!blogToAdd.likes) {
    blogToAdd.likes = 0
  }

  const blog = new Blog(blogToAdd)

  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogRouter