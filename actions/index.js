import { types } from './types'


export const updateSocketStatus = (status) => dispatch => {
  return dispatch({ type: types.UPDATE_SOCKET_STATUS, status, })
}
