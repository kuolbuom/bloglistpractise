// Import required testing dependencies
// const { test, after, beforeEach } = require('node:test')
// const assert = require('node:assert')
// const supertest = require('supertest')

// const app = require('../app')
// const helper = require('../utils/for_tests')
// const mongoose = require('mongoose')
// const Blog = require('../models/blog')

// // Create API testing client using supertest
// const api = supertest(app)

// console.log('file started')

// // Set up test data before each test runs
// beforeEach(async () => {
//   // Note: Blog.deleteMany is commented out to preserve data between tests
//   // await Blog.deleteMany({})

//   // Create blog objects from initial test data
//   const blogObjects = helper.initialBlogs
//     .map(blog => new Blog(blog))

//   // Create array of save promises for all blogs
//   const promiseArray = blogObjects.map(blog => blog.save())

//   // Wait for all blogs to be saved concurrently
//   await Promise.all(promiseArray)
// })

// // Test: Verify that a specific blog can be retrieved by ID
// test('a specific blog can be viewed', async () => {
//   console.log('test started')
//   // Get all blogs from the database
//   const blogsAtStart = await helper.blogsInDb()
//   // Select the first blog to retrieve
//   const blogToView = blogsAtStart[0]

//   // Send GET request to retrieve the specific blog by ID
//   const resultBlog = await api
//     .get(`/api/blogs/${blogToView.id}`)
//     // Expect HTTP 200 OK response
//     .expect(200)
//     // Expect response to have JSON content type
//     .expect('Content-Type', /application\/json/)

//   // Assert that the retrieved blog matches the expected blog data
//   assert.deepStrictEqual(resultBlog.body, blogToView)
// })

// // Clean up: Close MongoDB connection after tests complete
// after(async () => {
//   await mongoose.connection.close()
// })