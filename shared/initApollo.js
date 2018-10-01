import fetch from 'isomorphic-unfetch'
import ApolloClient from "apollo-client";
// Setup the network "links"
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloLink, from as apolloLinkFrom} from 'apollo-link';
import { SubscriptionClient } from "subscriptions-transport-ws";

function getApolloLink({token}){
  const wsurl = 'ws://localhost:4000/graphql';
  const httpurl = 'http://localhost:4000/graphql';


  const httpLink = new HttpLink({
    uri: httpurl,
    credentials: 'same-origin',
  });

  const authLink = new ApolloLink((operation, forward) => {
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return forward(operation);
  });

  if (process.browser){ 
    const wsClient = new SubscriptionClient(wsurl, {
      reconnect: true,
      connectionParams: () => ({
        authorization: `Bearer ${token}`,
      }),
    });
      
    wsClient.connectionCallback = err => {
      if (err && err.message === 'Authentication Failure!') {
        wsClient.close();
      }
    };
  
    const wsLink = new WebSocketLink(wsClient);
  
  
    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      wsLink,
      httpLink,
    )
  
    return apolloLinkFrom([authLink, link]);
  } else {
    return apolloLinkFrom([authLink, httpLink]);
  }

  
}
const httpurl = 'http://localhost:4000/graphql';


const httpLink = new HttpLink({
  uri: httpurl,
  credentials: 'same-origin',
});
let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink, //getApolloLink({token}),
    cache: new InMemoryCache().restore(initialState || {}),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
      query: {
        fetchPolicy: 'cache-and-network',
      },
    },
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}