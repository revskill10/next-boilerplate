import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import footers, { reducer as footersReducer } from './footers'
import tiers, { reducer as tiersReducer } from './tiers'
import demoData, { reducer as demoChartReducer } from './chart'
import socket, { reducer as socketReducer } from './socket'
import organization, { reducer as organizationReducer } from './organization'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

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

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);


export const makeStore = (initialState = exampleInitialState, apolloClient) => {
  return createStore(
    persistedReducer, 
    initialState, 
    composeWithDevTools(
      applyMiddleware(
        thunkMiddleware.withExtraArgument({apolloClient})
      )
    )
  )
}
