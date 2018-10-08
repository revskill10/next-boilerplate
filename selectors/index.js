import { createSelector } from 'reselect'

export const socketConnectedSelector = state => state.socket.status === 'Connected'

export const socketDisconnectedSelector = createSelector(
  socketConnectedSelector,
  isConnected => !isConnected
)
