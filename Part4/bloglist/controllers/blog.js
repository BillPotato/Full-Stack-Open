const blogRouter = require("express").Router()
const Blog = require("../models/blog.js")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

const logger = require("../utils/logger.js")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const user = await User.findById(decodedToken.id)

  const blogToAdd = {
    ...request.body,
    author: user.username
  }

  // check title & url
  if (!blogToAdd.title || !blogToAdd.url) {
    return response.status(400).json({"error": "missing parameters"})
  }

  // make default like = 0
  if (!blogToAdd.likes) {
    blogToAdd.likes = 0
  }

  const blog = new Blog(blogToAdd)

  const savedBlog = await blog.save()

  // save blog to user
  
  user.blogs = user.blogs.concat(savedBlog)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete("/:id", async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  const user = await User.findById(decodedToken.id)
  const userBlogs = user.blogs.map(blog => blog.toString())
  const id = request.params.id // noteId

  if (!userBlogs.includes(id)) {
    return response.status(401).json({ error: "user did not create note" })
  }

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
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({error: "invalid token"})
  }

  next(error)
}
blogRouter.use(errorHandler)


module.exports = blogRouter