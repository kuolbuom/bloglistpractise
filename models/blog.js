// Import Mongoose library for MongoDB object modeling
const mongoose = require('mongoose')

// Define the schema for Blog documents
const blogSchema = mongoose.Schema({
  title: String,          // Blog title
  author: String,         // Blog author name
  url: String,            // Blog URL/link
  likes: Number,          // Number of likes for the blog
})

// Configure JSON transformation when blog documents are converted to JSON
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Convert MongoDB's _id to id for cleaner API responses
    returnedObject.id = returnedObject._id.toString()
    // Remove MongoDB internal fields from the response
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Create and export the Blog model based on the schema
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog