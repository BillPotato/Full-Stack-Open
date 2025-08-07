import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationStatus, setNotificationStatus] = useState([]) // [0]: message [1]: className
  // user
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // blog
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("localUser"))

    if (localUser) {
      setUser(localUser)
      blogService.setToken(localUser.token)
    }
  }, [])

  // util functions
  const setNotification = ( message, style ) => {
    setNotificationStatus([message, style])

    setTimeout(() => {
      setNotificationStatus([])
    }, 3000)
  }

  // handlers
  const onUsernameChange = (event) => {
    const newUsername = event.target.value
    setUsername(newUsername)
  }

  const onPasswordChange = (event) => {
    const newPassword = event.target.value
    setPassword(newPassword)
  }

  // forms
  const onLogin = async (event) => {
    event.preventDefault()

    try {
      const credentials = {
        username,
        password
      }

      const user = await loginService.login(credentials)

      window.localStorage.setItem(
        "localUser",
        JSON.stringify(user)
      )

      setUsername("")
      setPassword("")
      setUser(user) 
      blogService.setToken(user.token)

      setNotification("login success", "success")
    }
    catch ( exception ) {
      setNotification("login failed", "error")
      console.log(exception)
    }
  }

  const onLogout = (event) => {
    setUser(null)
    window.localStorage.removeItem("localUser")
    setNotification("logout success", "success")
  }

  const onCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author: user.username,
        url,
        likes: 0
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle("")
      setUrl("")
      setNotification("blog creation success", "success")
    }
    catch (exception) {
      setNotification("blog creation failed", "error")
      console.log(exception)
    }
  }

  const notificationForm = () => {
    if (!notificationStatus[0]) return null

    return (
      <div className={notificationStatus[1]}>
        {notificationStatus[0]}
      </div>
    )
  }

  const loginForm = () => {
    return (
      <form onSubmit = {onLogin}>
        <h1>login</h1>
        {notificationForm()}
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
        {notificationForm()}
        <div>
          logged in as {user.username}
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
              onChange={(event)=>setTitle(event.target.value)} 
            />
          </div>
          <div>
            url: 
            <input 
              type="text"
              value={url}
              onChange={(event)=>setUrl(event.target.value)} 
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


  return (
    <div>
      {!user && loginForm()}
      {user && blogsForm()}
    </div>
  )
}

export default App