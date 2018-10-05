import { types } from './types'


export const updateSocketStatus = (status) =>
  ({ type: types.UPDATE_SOCKET_STATUS, status, })
  
