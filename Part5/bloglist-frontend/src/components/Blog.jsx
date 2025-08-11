import { useState } from "react"

const Blog = ({ blog, onLike }) => {
  // states
  const [visible, setVisible] = useState(false)

  // handlers
  const handleLike = (event) => {
    onLike(blog)
  }

  const showWhenVisible = { display: visible ? "" : "none" }
  const hideWhenVisible = { display: visible ? "none" : "" }

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
            onClick={onLike}
          >like</button>
        </div>
      </div>
    </div>
  )
}

export default Blog