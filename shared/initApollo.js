import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { ApolloLink, split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import { updateSocketStatus } from '../actions'

const GRAPHQL_URL=`https://api.ihs.edu.vn/`
const WS_URL=`wss://api.ihs.edu.vn/`

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState, { getToken, store }) {
  const ssrMode = !process.browser

  const httpLink = createHttpLink({
    uri: GRAPHQL_URL,
    credentials: 'same-origin'
  })

  const contextLink = setContext(
    async () => {
      const token = getToken()
      return {
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    }}
  )

  const errorLink = onError(
    ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(err =>
          console.log(`[GraphQL error]: Message: ${err.message}`)
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  )

  let link = ApolloLink.from([errorLink, contextLink, httpLink])

  if (!ssrMode) {
    const wsClient = new SubscriptionClient(WS_URL, {
      reconnect: true,
      timeout: 30000,
      connectionParams: async () => {
        const token = getToken()
        return {
          authorization: token ? `Bearer ${token}` : ''
        }
      }
    });

    wsClient.maxConnectTimeGenerator.duration = () => wsClient.maxConnectTimeGenerator.max
    wsClient.onDisconnected(() => { 
      store.dispatch(updateSocketStatus('Disconnected'))
    });

    wsClient.onConnecting(() => { 
      store.dispatch(updateSocketStatus('Connecting'))
    });

    wsClient.onReconnecting(() => { 
      store.dispatch(updateSocketStatus('Reconnecting'))
    });

    wsClient.onConnected(() => { 
      store.dispatch(updateSocketStatus('Connected'))
    });

    const wsLink = new WebSocketLink(wsClient)
    const subscriptionLink = ApolloLink.from([errorLink, wsLink])
    
    
    const hasSubscriptionOperation = ({ query: { definitions } }) =>
      definitions.some(
        ({ kind, operation }) =>
          kind === 'OperationDefinition' && operation === 'subscription',
      )
   
    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    link = split(
      hasSubscriptionOperation,
      subscriptionLink,
      link,
    )
  }

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: ssrMode, // Disables forceFetch on the server (so queries are only run once)
    link: link,
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
