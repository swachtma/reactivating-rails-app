import { connect } from 'react-redux';

import ChapterMenuItems from '../components/chapter_menu_items';
import { routeChapter } from '../actions/routes';

const mapStateToProps = (state) => ({
  active_chapter: state.chapters.find(
   (chapter) => chapter.id === state.settings.active_chapter_id
  ),
  chapters: state.chapters
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRouteChapter: (event,target) => dispatch(routeChapter(target.value))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChapterMenuItems);