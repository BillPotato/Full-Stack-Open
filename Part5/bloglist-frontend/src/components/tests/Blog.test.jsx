import { render, screen } from '@testing-library/react'
import Blog from '../Blog'

test("renders title and author only when not visible", () => {
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

    const mockHandler = vi.fn()

  render(<Blog user={user} blog={blog} onLike={mockHandler} onDelete={mockHandler} />)

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