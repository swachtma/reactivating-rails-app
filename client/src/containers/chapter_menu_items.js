import { connect } from 'react-redux';

import ChapterMenuItems from '../components/chapter_menu_items';
import { loadChapters } from '../actions/chapters';
import { routeChapter } from '../actions/routes';

const mapStateToProps = (state) => ({
  active_chapter: state.chapters.find(
   (chapter) => chapter.id === state.settings.active_chapter_id
  ),
  chapters: state.chapters
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadChapters: (payload) => dispatch(loadChapters(payload)),
  dispatchRouteChapter: (event,target) => dispatch(routeChapter(target.value))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChapterMenuItems);