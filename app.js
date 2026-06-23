// Import required dependencies
const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blog')

// Initialize Express application
const app = express()

// logger.info('connecting to', config.MONGODB_URI)

// Connect to MongoDB database with IPv4 family preference
mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    // Log successful MongoDB connection
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    // Log MongoDB connection errors
    logger.error('error connection to MongoDB:', error.message)
  })

// app.use(express.static('dist'))
// Middleware to parse incoming JSON request bodies
app.use(express.json())
// Middleware to log all incoming requests
app.use(middleware.requestLogger)

// Register the blogs API routes
app.use('/api/blogs', blogsRouter)

// Middleware to handle unknown endpoints (404 errors)
app.use(middleware.unknownEndpoint)
// Middleware to handle errors centrally
app.use(middleware.errorHandler)

// Export the configured app for use in index.js
module.exports = app