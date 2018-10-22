import { connect } from 'react-redux';
import React from 'react';

import ChapterMenuItems from '../components/chapter_menu_items';
import ChapterFooter from '../components/chapter_footer';
import { routeChapter } from '../actions/routes';

export const connectToChapters = (WrappedComponent) => {
  return connect(mapStateToProps,mapDispatchToProps)(
    chapterProvider(WrappedComponent)
  );
};

const chapterProvider = (WrappedComponent) => {
  return class extends React.Component {
    render(){
      if(this.props.chapters !== [] && this.props.active_chapter){
        return <WrappedComponent {...this.props} />;
        
      } else {
        return null;
      }
    }
  };
};

const mapStateToProps = (state) => ({
  active_chapter: state.chapters.find(
   (chapter) => chapter.id === state.settings.active_chapter_id
  ),
  
  next_chapter: state.chapters.find(
  (chapter) => chapter.id === state.settings.active_chapter_id + 1
  ),
  
  chapters: state.chapters
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRouteChapter: (event,target) => dispatch(routeChapter(target.value))
});

// EXPORTABLE CONNECTED COMPONENTS
export const ConnectedChapterMenuItems = connectToChapters(ChapterMenuItems);
export const ConnectedChapterFooterLink = connectToChapters(ChapterFooter);