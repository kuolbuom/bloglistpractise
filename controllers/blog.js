// Import required dependencies
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

// GET /api/blogs - Retrieve all blogs from the database
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

// GET /api/blogs/:id - Retrieve a specific blog by its ID
blogsRouter.get('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)

    // If blog found, return it; otherwise return 404 Not Found
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
})

// POST /api/blogs - Create a new blog entry
blogsRouter.post('/', async (request, response) => {
    // Extract blog data from request body
    const body = request.body

    // Create a new Blog document with the provided data
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })

    // Save the blog to the database and return the saved document
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

// DELETE /api/blogs/:id - Delete a blog by its ID
blogsRouter.delete('/:id', async (request, response) => {
    // Find and delete the blog by ID from the database
    await Blog.findByIdAndDelete(request.params.id)
    // Return 204 No Content status on successful deletion
    response.status(204).end()
})

// PUT /api/blogs/:id - Update an existing blog by its ID
blogsRouter.put('/:id', async (request, response) => {
    // Extract fields from request body for update
    const { title, author, url, likes } = request.body

    // Create an object with updated blog data
    const blog = {
      title,
      author,
      url,
      likes
    }

    // Update the blog in the database and return the updated document
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    )

    // If blog found and updated, return it; otherwise return 404 Not Found
    if (updatedBlog) {
      response.json(updatedBlog)
    } else {
      response.status(404).end()
    }
})

// Export the router for use in app.js
module.exports = blogsRouter