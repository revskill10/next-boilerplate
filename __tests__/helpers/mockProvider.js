import { makeStore } from './mockStore/store'
import { Provider as ReduxProvider } from 'react-redux'
import initApollo from '../../shared/initApollo'
import { ApolloProvider } from 'react-apollo'

const MockProvider = ({children}) => {
  const fakeStore = makeStore()
  const apolloClient = initApollo({}, {
    getToken: () => '',
    store: fakeStore,
  })
  return (
    <ReduxProvider store={fakeStore}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </ReduxProvider>
  )
}

export default MockProvider