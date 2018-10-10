import { types } from './types'
import { QueryKhoas as query } from '../graphql/modules/directory/khoas.gql'

export const updateSocketStatus = (status) =>
  ({ type: types.UPDATE_SOCKET_STATUS, status, })

export const updateDomain = (req) => async (dispatch, getState, { apolloClient }) => {
  const domain = req.get('host')

  const data = await apolloClient.query({
    query,
  })
  dispatch({ type: types.UPDATE_DOMAIN, domain, khoas: data.data.khoas})

}
