import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogsForm from "../BlogsForm"

let mockCreateBlog = vi.fn()

beforeEach(() => {
	render(<BlogsForm createBlog={mockCreateBlog} />)
})


test("calls even handler upon blog creation", async () => {
	const testUser = userEvent.setup()

	// click create blog button
	const createBlogButton = screen.getByText("create blog")
	await testUser.click(createBlogButton)

	// type input
	const [titleInput, urlInput] = screen.getAllByRole("textbox")
	await testUser.type(titleInput, "input title")
	await testUser.type(urlInput, "input url")

	// click create button
	const createButton = screen.getByText("create")
	await testUser.click(createButton)

	expect(mockCreateBlog.mock.calls[0][0].title).toBe("input title")	
	expect(mockCreateBlog.mock.calls[0][0].url).toBe("input url")	
})