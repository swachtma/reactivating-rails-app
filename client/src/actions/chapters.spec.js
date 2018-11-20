/* global expect */
import * as actions from './chapters'

describe('Chapters actionCreators', () => {
  test('loadChapters(chapters)', () => {
    expect(actions.loadChapters([{ contents: 'chapter' }])).toMatchSnapshot()
  })
})
