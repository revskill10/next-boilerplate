import { makeStore } from './mockStore/store'
import { Provider as ReduxProvider } from 'react-redux'

const MockProvider = ({children}) => {
  const fakeStore = makeStore()
  return (
    <ReduxProvider store={fakeStore}>
      {children}
    </ReduxProvider>
  )
}

export default MockProvider