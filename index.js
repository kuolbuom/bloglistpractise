// Import required modules
const assert = require('node:assert')
const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

// Start the Express server on the configured port
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})