import { parseCookies } from './parseCookies'

export const getToken = (req) => {
  return parseCookies(req).token
}
