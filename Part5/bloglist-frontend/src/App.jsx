import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login.js"

import NotificationForm from "./components/NotificationForm"
import LoginForm from "./components/LoginForm"
import BlogsForm from "./components/BlogsForm"

const App = () => {
  // states
  const [blogs, setBlogs] = useState([])
  const [notificationStatus, setNotificationStatus] = useState([null, null]) // [0]: message [1]: className
  // user
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // effects
  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("localUser"))

    if (localUser) {
      setUser(localUser)
      blogService.setToken(localUser.token)
    }
  }, [])

  // util functions
  const setNotification = ( message, status ) => {
    setNotificationStatus([message, status])

    setTimeout(() => {
      setNotificationStatus([null, null])
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

  const createBlog = async (newBlog) => {

    try {
      newBlog = {
        ...newBlog,
        author: user.username,
        likes: 0
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNotification("blog creation success", "success")
    }
    catch (exception) {
      setNotification("blog creation failed", "error")
      console.log(exception)
    }
  }

  const onLike = (blogToUpdate) => {
    const newBlog = {
      ...blogToUpdate,
      likes: blogToUpdate.likes+1
    }

    const updatedBlog = blogService
      .put(blogToUpdate.id, newBlog)

    const updatedBlogs = blogs.map(blog =>
      blog.id === blogToUpdate.id ? newBlog : blog
    )
    setBlogs(updatedBlogs)
  }

  const onDelete = (blogToDelete) => {
    if (!window.confirm(`Delete "${blogToDelete.title}" by "${blogToDelete.author}"?`)) return
    blogService
      .del(blogToDelete.id)
      .then((response) => {
        setBlogs(blogs.filter((blog => blog.id !== blogToDelete.id)))
      })
  }

  return (
    <div>
      <NotificationForm
        message={notificationStatus[0]}
        status={notificationStatus[1]}
      />
      {
        !user &&
        <LoginForm
          onLogin={onLogin}
          username={username}
          onUsernameChange={onUsernameChange}
          password={password}
          onPasswordChange={onPasswordChange}
        />
      }
      {
        user &&
        <div>
          <h2>blogs</h2>
          <div>
            logged in as {user.username}
            <button onClick={onLogout}>logout</button>
          </div>
          <BlogsForm
            user={user}
            createBlog={createBlog}
            onLogout={onLogout}
          />
          <ul>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                user={user}
                blog={blog}
                onLike={onLike}
                onDelete={onDelete}
              />)
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default App