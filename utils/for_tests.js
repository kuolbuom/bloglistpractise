// Import Blog model for database operations
const Blog = require("../models/blog")

// Sample blog data used for initializing test database
const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'HTML',
    url: 'HTML.com',
    likes: 20
  },
  {
    title: 'CSS is hard',
    author: 'CSS',
    url: 'CSS.com',
    likes: 50
  },
  {
    title: 'React is some how easy library',
    author: 'React',
    url: 'React.com',
    likes: 50
  }
]

// Helper function to generate a valid MongoDB ID that doesn't correspond to any existing blog
// Useful for testing endpoints with non-existent IDs
const nonExistingId = async () => {
  // Create a temporary blog entry
  const blog = new Blog({title: 'willremovethissoon'})
  // Save it to generate a valid MongoDB ID
  await blog.save()
  // Delete the temporary blog
  await blog.deleteOne()
  // Return the ID as a string for use in tests
  return blog._id.toString()
}

// Helper function to retrieve all blogs from the database in JSON format
// Used for checking blogs stored in the database during testing
const blogsInDb = async () => {
  // Fetch all blogs from the database
  const blog = await Blog.find({})
  // Convert each blog to JSON format and return as array
  return blog.map(b => b.toJSON())
}

// Export helper functions and test data for use in test files
module.exports = {
initialBlogs, nonExistingId, blogsInDb
}