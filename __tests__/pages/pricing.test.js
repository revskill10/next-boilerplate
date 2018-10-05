/* eslint-env jest */

//import { shallow } from 'enzyme'
import App from '../../pages/pricing.js'
import mockPage from '../../test/mockPage'

/*
describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<App />)

    expect(app.find('p').text()).toEqual('Hello World!')
  })
})
*/
describe('With Snapshot Testing', () => {
  it('App shows "Pricing"', () => {
    const component = mockPage(App)
    expect(component).toMatchSnapshot()
  })
})
