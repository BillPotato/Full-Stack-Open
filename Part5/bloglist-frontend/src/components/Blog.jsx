import { useState } from "react"

const Blog = ({ user, blog, onLike, onDelete }) => {
  // states
  const [visible, setVisible] = useState(false)

  // handlers
  const handleLike = (event) => {
    // console.log(blog)
    onLike(blog)
  }

  const handleDelete = (event) => {
    onDelete(blog)
  }

  const showWhenVisible = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }
  // display if blog is created by logged in user
  const showIfUser = { display: blog.user.toString() === user.id ? "" : "none" }

  return (  
    <div>
      <div className="blog" style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button
          onClick={()=>setVisible(true)}
        >view</button>
      </div>  

      <div className="blog" style={showWhenVisible}>
        <div>
          {blog.title} {blog.author}
          <button
            onClick={()=>setVisible(false)}
          >hide</button>
        </div>
        <div>url: {blog.url}</div>
        <div>
          likes: {blog.likes}
          <button
            onClick={handleLike}
          >like</button>
        </div>
        <button
          onClick={handleDelete}
          style={showIfUser}
        >delete</button>
      </div>
    </div>
  )
}

export default Blog