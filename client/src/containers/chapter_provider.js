import { connect } from 'react-redux';
import React, { Component } from 'react';

import ChapterFooter from '../components/chapter_footer';
import NavigationMenus from '../components/navigation_menus';
import { routeChapter } from '../actions/routes';

export const connectToChapters = (WrappedComponent) => 
  connect(mapStateToProps,mapDispatchToProps)(chapterProvider(WrappedComponent));


export const chapterProvider = (WrappedComponent) => class ChapterFilter extends Component {
  static displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  render(){
    const { active_chapter_id, chapters, ...otherProps } = this.props;
    const active_chapter = chapters.find(c => c.id === active_chapter_id);
    const next_chapter = chapters.find(c => c.id === active_chapter_id + 1);
    
    const cleaned_chapters = chapters.map( c =>{
      c.title = c.title.replace(/^chapter\s?/i,"");
      return c;
    });
    
    return  chapters && chapters.length ? 
      <WrappedComponent active_chapter={active_chapter || {id: -1, title: ""}}
        next_chapter={next_chapter} chapters={cleaned_chapters} {...otherProps} /> : null;
  }
};

const mapStateToProps = (state) => ({
  chapters: state.chapters,
  active_chapter_id: state.settings.active_chapter_id
});

const mapDispatchToProps = (dispatch) => ({
  dispatchRouteChapter: (event,target) => dispatch(routeChapter(target.value))
});

// EXPORTABLE CONNECTED COMPONENTS
export const ConnectedChapterFooterLink = connectToChapters(ChapterFooter);
export const ConnectedNavigationMenus = connectToChapters(NavigationMenus);