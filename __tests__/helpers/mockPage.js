import MockProvider from './mockProvider'
//import renderer from 'react-test-renderer'

const component = render => App => {
  return render(
    <MockProvider>
      <App />
    </MockProvider>
  )
}

export default component