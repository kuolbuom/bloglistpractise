// Import required testing and application dependencies
const mongoose = require('mongoose')
const { test, after, describe, beforeEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const helper = require('../utils/for_tests')

// Create API testing client using supertest
const api = supertest(app)

// Set up test data before each test runs
// Alternative implementations commented out for reference
beforeEach(async () => {
  // Clear all existing blogs from the test database
  await Blog.deleteMany({})
  console.log('cleared')

  // Insert initial test blogs into the database
  await Blog.insertMany(helper.initialBlogs)
   console.log('done')
})

// Test: Verify that blogs are returned as JSON format
test('blogs are returned as json', async () => {
    console.log('entered test')
  await api
    // Make GET request to retrieve all blogs
    .get('/api/blogs')
    // Expect HTTP 200 OK response
    .expect(200)
    // Expect response to have JSON content type
    .expect('Content-Type', /application\/json/)
})

// Test: Verify that a new blog can be added successfully
test('a valid blog can be added', async () => {
  // Create a new blog object with test data
  const newBlog = {
    title: 'async/await simplifies making async calls',
    author: 'async/await',
    url: 'async/await.com',
    likes: 2
  }

  // Send POST request to add the new blog
  await api
    .post('/api/blogs')
    .send(newBlog)
    // Expect HTTP 201 Created response
    .expect(201)
    // Expect response to have JSON content type
    .expect('Content-Type', /application\/json/)

  // Retrieve all blogs to verify the new blog was added
  const response = await api.get('/api/blogs')

  // Extract titles from the response
  const titles = response.body.map(r => r.title)

  // Assert that the total blog count increased by 1
  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  // Assert that the new blog title is in the database
  assert(titles.includes('async/await simplifies making async calls'))
})

// //invalid test post
//  test('blog without title is not added', async () => {
//     const newBlog = {
//       author: 'none'
//     }

//     await api
//       .post('/api/blogs')
//       .send(newBlog)
//       .expect(400)

//     // const response = await api.get('/api/blogs')
//     const blogsAtEnd = await helper.blogsInDb()

//     assert.strictEqual(blogsAtEnd.body.length, helper.initialBlogs.length)
//   })

// describe('all blogs', () => {
//   test('all blogs are returned', async () => {
//     const response = await api.get('/api/blogs')

//     assert.strictEqual(response.body.length, helper.initialBlogs.length)
//   })

//   test('a specific blog is within the returned blogs', async () => {
//     const response = await api.get('/api/blogs')

//     const titles = response.body.map(e => e.title)
//     assert.strictEqual(titles.includes('HTML is easy'), true)
//   })
// })

// //Running tests one by one
// // test.only('blogs are returned as json', async () => {
// //   await api
// //     .get('/api/blogs')
// //     .expect(200)
// //     .expect('Content-Type', /application\/json/)
// // })

// // test.only('all blogs are returned', async () => {
// //   const response = await api.get('/api/blogs')

//   //finding all notes from database
//   //   Blog.find({}).then(blog => {
//   //   console.log('operation returned the following blogs', blog)
//   // })

//   //finding notes from database and delete one with the index of zero
//   // Blog.find({})
//   //   .then(blog => {
//   //     return blog[0].deleteOne()
//   //   })
//   //   .then(response => {
//   //     console.log('the first note is removed', response )
//   //   })


// //   const main = async () => {
// //     const blog = await Blog.find({})
// //     console.log('operation returned the following blogs', blog)


// //     const blogs = await Blog.find({})
// //     const res = await blogs[0].deleteOne()
// //     console.log('the first note is removed', res)
// //   }

// //   await main()

// //   assert.strictEqual(response.body.length, 3)
// // })


after(async () => {
  await mongoose.connection.close()
})