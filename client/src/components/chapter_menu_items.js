import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class ChapterMenuItems extends Component {
  renderChapterOptions = () => {
    let chapters_list = [];
    this.props.chapters.forEach((chapter) => {
      chapters_list.push(
        { 
          key: "chapter_" + chapter.id,
          id:  "chapter_menu_item_" + chapter.id,
          value: chapter.id,
          text: chapter.title,
          active: chapter.id === this.props.active_chapter.id
        }
      );
    });
    return chapters_list;
  }
  
  render() {
    if(this.props.chapters !== [] && this.props.active_chapter){
      return( 
        <Dropdown 
          tabIndex="1"
          placeholder="Jump to Chapter..."
          className="link item"
          selectOnNavigation={false}
          value={this.props.active_chapter.id}
          text={this.props.active_chapter.title}
          onChange={this.props.dispatchRouteChapter}
          options={this.renderChapterOptions()} 
        />
      );
    } else {
      return null;
    }
  }
}