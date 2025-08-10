import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login.js"

import NotificationForm from "./components/NotificationForm"
import LoginForm from "./components/LoginForm"
import BlogsForm from "./components/BlogsForm"

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
    // TODO: Synchronise notificationStatus of LoginForm and Blogsform
    // so that they dont need separate attributes
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

  const onTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const onUrlChange = (event) => {
    setUrl(event.target.value)
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

  return (
    <div>
      {
        !user && 
        <LoginForm 
          onLogin={onLogin}
          notiMessage={notificationStatus[0]}
          notiStatus={notificationStatus[1]}
          username={username}
          onUsernameChange={onUsernameChange}
          password={password}
          onPasswordChange={onPasswordChange}
        />
      }
      {
        user && 
        <BlogsForm 
          notiMessage={notificationStatus[0]}
          notiStatus={notificationStatus[1]}
          displayName={user.username}
          onLogout={onLogout}
          onCreateBlog={onCreateBlog}
          title={title}
          onTitleChange={onTitleChange}
          url={url}
          onUrlChange={onUrlChange}
          blogs={blogs}
        />
      }
    </div>
  )
}

export default App