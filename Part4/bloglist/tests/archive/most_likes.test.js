const { test, describe } = require("node:test")
const assert = require("node:assert")
const mostLikes = require("../utils/list_helper.js").mostLikes

describe("most likes", () => {
  const emptyList = []

  const listWithOneBlog1 = [
    {
      author: "Bill",
      likes: 5
    }
  ]


  const listWithOneBlog2 = [
    {
      author: "Billy",
      likes: 1000
    }
  ]
  
  const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

  test("empty list", () => {
    const res = {
      author: null,
      likes: null
    }
    assert.deepStrictEqual(mostLikes(emptyList), res)
  })

  test("list with one blog 1", () => {
    const res = {
      author: "Bill",
      likes: 5
    }
    assert.deepStrictEqual(mostLikes(listWithOneBlog1), res)
  })


  test("list with one blog 2", () => {
    const res = {
      author: "Billy",
      likes: 1000
    }
    assert.deepStrictEqual(mostLikes(listWithOneBlog2), res)
  })


  test("list with many blogs", () => {
    const res = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }
    assert.deepStrictEqual(mostLikes(listWithManyBlogs), res)
  })
})