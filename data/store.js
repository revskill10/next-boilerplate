import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import footers, { reducer as footersReducer } from './footers'
import tiers, { reducer as tiersReducer } from './tiers'
import demoData, { reducer as demoChartReducer } from './chart'
import { combineReducers } from 'redux'

const exampleInitialState = {
  footers,
  tiers,
  demoData,
}
/*
export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK'
}


// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }), 1000)
}

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
}
*/

const reducer = combineReducers({
  footers: footersReducer,
  tiers: tiersReducer,
  demoData: demoChartReducer,
})

export const makeStore = (initialState = exampleInitialState) => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}