import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'


let mockLikeHandler
let mockDeleteHandler

beforeEach(() => {
  const user = {
    "username": "",
    "id": "",
    "token": ""
  }

  const blog = {
    "title": "title",
    "author": "author",
    "url": "",
    "likes": 0,
    "user": "",
    "id": ""
  }

  mockLikeHandler = vi.fn()
  mockDeleteHandler = vi.fn()

  render(<Blog user={user} blog={blog} onLike={mockLikeHandler} onDelete={mockDeleteHandler} />)
})


test("renders title and author only when not visible", () => {

  // check title and author are displayed
  const title = screen.getAllByText("title", {"exact": false})
  expect(title[0]).toBeVisible()
  const author = screen.getAllByText("author", {"exact": false})
  expect(author[0]).toBeVisible()

  // check url and likes are not displayed
  const url = screen.getByText("url", {"exact": false})
  expect(url).not.toBeVisible()
  const likes = screen.getByText("likes", {"exact": false})
  expect(likes).not.toBeVisible()
})


test("url and likes are displated when \"view\" button is clicked", async () => {

  // click button
  const testUser = userEvent.setup()
  const viewButton = screen.getByText("view")
  await testUser.click(viewButton)

  // check url and likes are displayed
  const url = screen.getByText("url", {"exact": false})
  expect(url).toBeVisible()
  const likes = screen.getByText("likes", {"exact": false})
  expect(likes).toBeVisible()
})


test("like handler is triggered twice if like button is pressed twice", async () => {

  // click view button
  const testUser = userEvent.setup()
  const viewButton = screen.getByText("view")
  testUser.click(viewButton)

  // click like button twice
  const likeButton = screen.getByText("like")
  await testUser.click(likeButton)
  await testUser.click(likeButton)

  expect(mockLikeHandler.mock.calls).toHaveLength(2)
})