import * as constants from '../../constants/bookmarks'

const default_state = {
  prompt_shown: true,
  last_read: { chapter: 1 },
  furthest_read: { chapter: 1 }
}

export const buildLocations = (state, new_loc) => {
  let position = state.furthest_read.chapter < new_loc.chapter ? new_loc : state.furthest_read
  return Object.assign({}, state, { last_read: new_loc, furthest_read: position })
}

export default function bookmarksReducer (state = default_state, action) {
  switch (action.type) {
    case (constants.SET_BOOKMARK_LOCATIONS):
      return buildLocations(state, action.payload)
    case (constants.SET_BOOKMARK_OFFERED):
      return Object.assign({}, state, { prompt_shown: action.payload.prompt_shown })
    default:
      return state
  }
}
