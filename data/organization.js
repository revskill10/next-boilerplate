import { types } from '../actions/types'

const organization = {
  domain: ''
}


export const reducer = (state = organization, action) => {
  switch (action.type) {
    case types.UPDATE_DOMAIN:
      return Object.assign({}, state, {
        domain: action.domain,
      })
    default: return state
  }
}

export default organization;