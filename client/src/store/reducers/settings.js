import * as constants from '../../constants/settings'

let default_state = {}
let default_chapter = 1

export default function settingsReducer (state = default_state, action) {
  switch (action.type) {
    case (constants.HOME_ROUTE):
      return Object.assign({}, state, { active_chapter_id: default_chapter })
    case (constants.CHAPTER_ROUTE):
      return Object.assign({}, state, { active_chapter_id: action.payload.chapter_id })
    default:
      return state
  }
}
