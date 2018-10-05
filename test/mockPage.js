import MockProvider from './mockProvider'
import renderer from 'react-test-renderer'

const component = App => {
  return renderer.create(
    <MockProvider>
      <App/>
    </MockProvider>
  )
}

export default component