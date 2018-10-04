import { types } from '../actions/types'

const socket = {
  status: "Disconnected",
}

export const reducer = (state = socket, action) => {
  switch (action.type) {
    case types.UPDATE_SOCKET_STATUS:
      return Object.assign({}, state, {
        status: action.status,
      })
    default: return state
  }
}

export default socket;
