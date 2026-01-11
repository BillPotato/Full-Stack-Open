import { useState, useEffect } from "react"

import Blog from "./Blog"
import Togglable from "./Togglable"

const BlogsForm = ({
	createBlog,
}) => {

	// states
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")

	// handlers
	const onCreateBlog = (event) => {
		event.preventDefault()
		createBlog({
			title,
			url
		})
		setTitle("")
		setUrl("")
	}

	const onTitleChange = (event) => {
		setTitle(event.target.value)
	}

	const onUrlChange = (event) => {
		setUrl(event.target.value)
	}

    return (
      <div>
        <Togglable buttonLabel="create blog">
	        <h1>create new</h1>
	        <form onSubmit={onCreateBlog}>
	          <div>
	            title: 
	            <input 
	              type="text" 
	              value={title}
	              onChange={onTitleChange} 
	            />
	          </div>
	          <div>
	            url: 
	            <input 
	              type="text"
	              value={url}
	              onChange={onUrlChange} 
	            />
	          </div>
	          <button type="submit">create</button>
	        </form>
      	</Togglable>
      </div>
    )
}

export default BlogsForm