import { types } from './types'
import { getToken } from '../shared/getToken'
import gql from 'graphql-tag';


export const updateSocketStatus = (status) =>
  ({ type: types.UPDATE_SOCKET_STATUS, status, })

export const updateDomain = ({domain, isServer, req}) => (dispatch, getState, { apolloClient }) => {
  if (isServer) {
    /*
    apolloClient.query({
      query: gql`
        query {
          khoas{
            id
            ten_khoa
          }
        }
      `,
    })
    .then(data => console.log(data))
    .catch(error => console.error(error))
    */
    dispatch({ type: types.UPDATE_DOMAIN, domain, })
  }
}
