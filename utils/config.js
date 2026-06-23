// Load environment variables from .env file
require('dotenv').config()

// Get the server port from environment variables
const PORT = process.env.PORT

// Select MongoDB URI based on the environment (test or production)
const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

// Export configuration values for use throughout the application
module.exports = { MONGODB_URI, PORT }