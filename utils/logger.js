// Log info messages - suppressed during test environment
const info = (...params) => {
   // Only log if not in test mode to avoid cluttering test output
   if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}

// Log error messages - suppressed during test environment
const error = (...params) => {
  // Only log if not in test mode to avoid cluttering test output
  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
}

// Export logging functions for use throughout the application
module.exports = { info, error }