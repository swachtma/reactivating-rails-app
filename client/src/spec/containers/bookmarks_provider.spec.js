/* global expect */
import { calculateDisplayState } from '../../containers/bookmarks_provider'

let defaultState = {
  location: { payload: { chapter_id: 1 } }
}

let examples = [
  { test_case: { bookmarks: { prompt_shown: false, last_read: { chapter: 1 }, furthest_read: { chapter: 1 } } }, expect: false },
  { test_case: { bookmarks: { prompt_shown: false, last_read: { chapter: 2 }, furthest_read: { chapter: 1 } } }, expect: true },
  { test_case: { bookmarks: { prompt_shown: false, last_read: { chapter: 1 }, furthest_read: { chapter: 2 } } }, expect: true },
  { test_case: { bookmarks: { prompt_shown: true, last_read: { chapter: 1 }, furthest_read: { chapter: 1 } } }, expect: false },
  { test_case: { bookmarks: { prompt_shown: true, last_read: { chapter: 2 }, furthest_read: { chapter: 1 } } }, expect: false },
  { test_case: { bookmarks: { prompt_shown: true, last_read: { chapter: 1 }, furthest_read: { chapter: 2 } } }, expect: false }
]

describe('bookmarksProvider', () => {
  examples.forEach((example) => {
    test('calculateDisplayState() for ' + JSON.stringify(example.test_case) + ' should return ' + example.expect, () => {
      let state = Object.assign({}, defaultState, example.test_case)
      expect(calculateDisplayState(state)).toEqual(example.expect)
    })
  })
})
