import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import footers, { reducer as footersReducer } from './footers'
import tiers, { reducer as tiersReducer } from './tiers'
import demoData, { reducer as demoChartReducer } from './chart'
import socket, { reducer as socketReducer } from './socket'
import organization, { reducer as organizationReducer } from './organization'
import { combineReducers } from 'redux'

export const exampleInitialState = {
  footers,
  tiers,
  demoData,
  socket,
  organization,
}

const reducer = combineReducers({
  footers: footersReducer,
  tiers: tiersReducer,
  demoData: demoChartReducer,
  socket: socketReducer,
  organization: organizationReducer,
})

export const makeStore = (initialState = exampleInitialState, apolloClient) => {
  return createStore(
    reducer, 
    initialState, 
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument({apolloClient})
      )
    )
  )
}