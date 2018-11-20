/* global expect */
import * as actions from './nodes'

describe('Nodes actionCreators', () => {
  test('loadNodes(node)', () => {
    expect(actions.loadNodes([{ contents: 'Test node' }])).toMatchSnapshot()
  })
})
