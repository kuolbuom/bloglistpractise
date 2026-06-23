// Import logger utility
const logger = require('./logger')

// Middleware to log all incoming HTTP requests
const requestLogger = (request, response, next) => {
  // Log the HTTP method of the request
  logger.info('Method:', request.method)
  // Log the request path/endpoint
  logger.info('Path:  ', request.path)
  // Log the request body containing the data sent
  logger.info('Body:  ', request.body)
  // Separator for better readability in logs
  logger.info('---')
  // Pass control to the next middleware/route handler
  next()
}

// Middleware to handle requests to unknown/non-existent endpoints
const unknownEndpoint = (request, response) => {
  // Return 404 Not Found status with error message
  response.status(404).send({ error: 'unknown endpoint' })
}

// Middleware to handle errors globally
const errorHandler = (error, request, response, next) => {
  // Log the error message
  logger.error(error.message)

  // Handle MongoDB CastError (invalid ID format)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  // Handle MongoDB ValidationError (data validation failed)
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  // Pass error to the next error handler if not caught above
  next(error)
}

// Export all middleware functions for use in app.js
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}