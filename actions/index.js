import { types } from './types'
import { getToken } from '../shared/getToken'

export const updateSocketStatus = (status) =>
  ({ type: types.UPDATE_SOCKET_STATUS, status, })

export const updateDomain = ({domain, isServer, req}) => (dispatch, getState, { apolloClient }) => {
  if (isServer) {
    dispatch({ type: types.UPDATE_DOMAIN, domain, })
  }
}
