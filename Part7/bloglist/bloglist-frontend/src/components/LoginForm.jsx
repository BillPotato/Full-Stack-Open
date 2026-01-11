const LoginForm = ({
  onLogin,
  username,
  onUsernameChange,
  password,
  onPasswordChange
}) => {
  return (
    <form onSubmit = {onLogin}>
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

export default LoginForm