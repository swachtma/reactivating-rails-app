import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const styles = {
  dropdown: {margin: "0 1em"}
};

export default class ChapterMenuItems extends Component {
  renderChapterOptions = () => {
    let { active_chapter, chapters } = this.props;
    let chapters_list = [];
    chapters.forEach((chapter) => {
      chapters_list.push(
        { 
          key: "chapter_" + chapter.id,
          id:  "chapter_menu_item_" + chapter.id,
          value: chapter.id,
          text: chapter.title,
          active: chapter.id === active_chapter.id
        }
      );
    });
    return chapters_list;
  }
  
  render() {
    let { active_chapter, dispatchRouteChapter, handleSidebarVisibility } = this.props;
    return( 
        <Dropdown onFocus={handleSidebarVisibility}
          pointing="top right"
          tabIndex="1"
          placeholder="Jump to Chapter..."
          className="link item"
          style={styles.dropdown}
          selectOnNavigation={false}
          selectOnBlur={false}
          value={active_chapter.id}
          text={active_chapter.title}
          onChange={dispatchRouteChapter}
          options={this.renderChapterOptions()} 
        />
      );
  }
}