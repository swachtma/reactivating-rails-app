import { connect } from 'react-redux';

import ChapterMenuItems from '../components/chapter_menu_items';
import { loadChapters } from '../actions/chapters';

const mapStateToProps = (state) => ({
  chapters: state.chapters
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadChapters: (payload) => dispatch(loadChapters(payload))
});

export default connect(mapStateToProps,mapDispatchToProps)(ChapterMenuItems);