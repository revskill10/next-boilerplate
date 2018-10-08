import { types } from './types'

export const updateSocketStatus = (status) =>
  ({ type: types.UPDATE_SOCKET_STATUS, status, })

export const updateDomain = (domain, isServer = false) => (dispatch, getState, { query }) => {
  if (isServer) {
    console.log('updating domain')
    console.log(getState())

    dispatch({ type: types.UPDATE_DOMAIN, domain, })
  }
}
