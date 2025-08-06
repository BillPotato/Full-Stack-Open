import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // handlers
  const onUsernameChange = (event) => {
    const newUsername = event.target.value
    setUsername(newUsername)
  }

  const onPasswordChange = (event) => {
    const newPassword = event.target.value
    setPassword(newPassword)
  }

  const onLoginSubmit = async (event) => {
    event.preventDefault()


    try {
      const credentials = {
        username,
        password
      }

      const user = await loginService.login(credentials)

      setUser(user) 
    }
    catch ( exception ) {
      setUsername("")
      setPassword("")
      console.log("Invalid credentials")
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit = {onLoginSubmit}>
        <h1>login</h1>
        <div>
          <span>username: </span>
          <input
            type = "text"
            value = {username}
            onChange = {onUsernameChange}
          />
        </div>
        <div>
          <span>password: </span>
          <input 
            type = "password"
            value = {password}
            onChange = {onPasswordChange}
          />
        </div>
        <button type="submit">
          submit
        </button>
      </form>
    )
  }

  const blogsForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>logged in as {user.username}</div>
        <br></br>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }


  return (
    <div>
      {!user && loginForm()}
      {user && blogsForm()}
    </div>
  )
}

export default App