import { connect } from 'react-redux'

import BookmarkModal from '../components/bookmark_modal'
import { setBookmarkOffered } from '../actions/bookmarks'
import { routeChapter } from '../actions/routes'

export const calculateDisplayState = (state) => {
  let { prompt_shown, last_read, furthest_read } = state.bookmarks
  let loc = state.location.payload.chapter_id
  return !((prompt_shown || (loc === last_read.chapter && loc === furthest_read.chapter)))
}

const mapStateToProps = (state) => ({
  displayState: calculateDisplayState(state),
  last_read_id: state.bookmarks.last_read.chapter,
  furthest_read_id: state.bookmarks.furthest_read.chapter,
  active_chapter_id: state.settings.active_chapter_id
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSetBookmarkOffered: (bool) => dispatch(setBookmarkOffered(bool)),
  dispatchRoutechapter: (chapter_id) => dispatch(routeChapter(chapter_id))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkModal)
