import { connect } from 'react-redux';
import React from 'react';

import ChapterFooter from '../components/chapter_footer';
import NavigationMenus from '../components/navigation_menus';
import { routeChapter } from '../actions/routes';

export const connectToChapters = (WrappedComponent) => {
   return connect(mapStateToProps,mapDispatchToProps)(chapterProvider(WrappedComponent));
};

const chapterProvider = (WrappedComponent) => {
  return class extends React.Component {
    render(){
      if(this.props.chapters !== []){
        return <WrappedComponent {...this.props} active_chapter={this.props.active_chapter || -1} />;
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
export const ConnectedChapterFooterLink = connectToChapters(ChapterFooter);
export const ConnectedNavigationMenus = connectToChapters(NavigationMenus);