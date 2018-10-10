import { types } from '../actions/types'

const organization = {
  domain: '',
  khoas: [],
}

export const reducer = (state = organization, action) => {
  switch (action.type) {
    case types.UPDATE_DOMAIN:
      return Object.assign({}, state, {
        domain: action.domain,
        khoas: action.khoas,
      })
    default: return state
  }
}

export default organization;