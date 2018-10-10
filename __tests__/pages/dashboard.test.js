/* eslint-env jest */

//import { shallow } from 'enzyme'
import App from '../../pages/dashboard.js'
import mockPage from '../helpers/mockPage'
import { createRender } from '@material-ui/core/test-utils';
import toJson from 'enzyme-to-json';
/*
describe('With Enzyme', () => {
  it('App shows "Hello world!"', () => {
    const app = shallow(<App />)

    expect(app.find('p').text()).toEqual('Hello World!')
  })
})
*/
describe('With Snapshot Testing', () => {
  let render;

  beforeEach(() => {
    render = createRender();
  });

  it('App shows "About"', () => {
    const component = mockPage(render)(App)
    expect(toJson(component)).toMatchSnapshot()
  })
})
