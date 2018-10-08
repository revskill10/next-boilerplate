import cookie from 'cookie'

export const parseCookies = (req, options = {}) => {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  )
}
