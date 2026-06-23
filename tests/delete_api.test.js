// Import required testing dependencies
// const mongoose = require('mongoose')
// const { test, after, beforeEach } = require('node:test')
// const assert = require('node:assert')
// const supertest = require('supertest')

// const app = require('../app')
// const helper = require('../utils/for_tests')
// const Blog = require('../models/blog')

// // Create API testing client using supertest
// const api = supertest(app)

// // Set up test data before each test runs
// beforeEach(async () => {
//   // Clear all existing blogs from the test database
//   await Blog.deleteMany({})

//   // Create blog objects from initial test data
//   const blogObjects = helper.initialBlogs
//     .map(blog => new Blog(blog))

//   // Create array of save promises for all blogs
//   const promiseArray = blogObjects.map(blog => blog.save())

//   // Wait for all blogs to be saved concurrently
//   await Promise.all(promiseArray)
// })

// // Test: Verify that a blog can be successfully deleted
// test('a blog can be deleted', async () => {
//   // Retrieve all blogs from database before deletion
//   const blogsAtStart = await helper.blogsInDb()
//   // Select the first blog as the one to delete
//   const blogToDelete = blogsAtStart[0]
//   console.log('Blog to Delete', blogToDelete)

//   // Send DELETE request to remove the selected blog
//   await api
//     .delete(`/api/blogs/${blogToDelete.id}`)
//     // Expect HTTP 204 No Content response on successful deletion
//     .expect(204)

//   // Retrieve all blogs from database after deletion
//   const blogsAtEnd = await helper.blogsInDb()

//   // Extract IDs from remaining blogs
//   const ids = blogsAtEnd.map(n => n.id)

//   // Assert that the deleted blog's ID is no longer in the database
//   assert(!ids.includes(blogToDelete.id))

//   // Assert that the total blog count decreased by exactly 1
//   assert.strictEqual(
//     blogsAtEnd.length,
//     helper.initialBlogs.length - 1
//   )
// })

// // Clean up: Close MongoDB connection after tests complete
// after(async () => {
//   await mongoose.connection.close()
// })