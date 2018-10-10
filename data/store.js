import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { reducer as footersReducer } from './footers'
import { reducer as tiersReducer } from './tiers'
import { reducer as demoChartReducer } from './chart'
import { reducer as socketReducer } from './socket'
import { reducer as organizationReducer } from './organization'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

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

export const makeStore = (apolloClient, initialState = {}) => {
  let middlewares = [thunkMiddleware.withExtraArgument({apolloClient})]
  if (process.env.NODE_ENV === `development`) {
    const { logger } = require(`redux-logger`);
    middlewares.push(logger);
    return composeWithDevTools(
      applyMiddleware(...middlewares)
    )(createStore)(persistedReducer, initialState);
  } else {
    return compose(
      applyMiddleware(...middlewares)
    )(createStore)(persistedReducer, initialState);
  }
}
