const AuthLink = ({token}) => {
  if (token) {
    return (
      <a href="/logout" className="menu-item" style={{'textDecoration': 'none'}}>Logout</a>
    )
  } else {
    return (
      <a href="/auth/google" className="menu-item" style={{'textDecoration': 'none'}}>Login</a>
    )
  }
}

export default AuthLink;