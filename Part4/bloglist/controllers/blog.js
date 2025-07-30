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

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id

  await Blog.findByIdAndDelete(id)
  response.status(204).end()
})

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id
  const blogToUpdate = await Blog.findById(id)

  if (!blogToUpdate) {
    response.status(404).end()
    return
  }

  const { likes } = request.body

  blogToUpdate.likes = likes
  await blogToUpdate.save()

  response.json(blogToUpdate)
})


// ____________________________________________________

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).json({"error": "invalid ID"})
  }

  next(error)
}
blogRouter.use(errorHandler)


module.exports = blogRouter