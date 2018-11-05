import { connect } from 'react-redux';

import BookmarkModal from '../components/bookmark_modal'
import { setBookmarkOffered } from '../actions/bookmarks';
import { routeChapter } from '../actions/routes';

export const calculateDisplayState = (state) => {
  let bm = state.bookmarks;
  let loc = state.location.payload.chapter_id;
  if(bm.prompt_shown || (loc === bm.last_read.chapter && loc === bm.furthest_read.chapter)){
    return false;
  } else {
    return true;
  }
};

const bookmarksProvider = (WrappedComponent = BookmarkModal) => {
  let mapStateToProps = (state) => ({
    displayState: calculateDisplayState(state),
    last_read: state.bookmarks.last_read,
    furthest_read: state.bookmarks.furthest_read
  });
  
  let mapDispatchToProps = (dispatch) => ({
    dispatchSetBookmarkOffered: (bool) => dispatch(setBookmarkOffered(bool)),
    dispatchRoutechapter: (chapter_id) => dispatch(routeChapter(chapter_id))
  });
  
  return connect(mapStateToProps,mapDispatchToProps)(WrappedComponent);
};

export const ConnectedBookmarkModal = bookmarksProvider();
export default bookmarksProvider;