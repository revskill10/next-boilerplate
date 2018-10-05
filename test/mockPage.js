import MockProvider from './mockProvider'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'

const component = App => {
  return toJson(renderer.create(
    <MockProvider>
      <App />
    </MockProvider>
  ))
}

export default component