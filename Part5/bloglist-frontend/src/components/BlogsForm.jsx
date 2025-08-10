import NotificationForm from "./NotificationForm"
import Blog from "./Blog"

const BlogsForm = ({
	notiMessage,
	notiStatus,
	displayName,
	onLogout,
	onCreateBlog,
	title,
	onTitleChange,
	url,
	onUrlChange,
	blogs
}) => {
    return (
      <div>
        <h2>blogs</h2>
        <NotificationForm 
          message={notiMessage}
          status={notiStatus}
        />
        <div>
          logged in as {displayName}
          <button onClick = {onLogout}>
            logout
          </button>
        </div>
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
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
}

export default BlogsForm