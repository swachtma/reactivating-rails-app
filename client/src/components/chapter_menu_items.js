import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import axios from 'axios';

export default class ChapterMenuItems extends Component {
  componentWillMount(){
    axios.get("/api/chapters")
    .then(
      (response) => {
        this.props.dispatchLoadChapters(response.data);
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    );
  }
  
  renderChapterMenuItems = (chapters) => {
    let chapters_list = [];
    chapters.forEach((chapter) => {
      chapters_list.push(
        <Dropdown.Item key={"chapter_" + chapter.id} id={chapter.id}>
          {chapter.title}
        </Dropdown.Item>
      );
    });
    return chapters_list;
  }
  
  render() {
    return (
      <Dropdown text='Jump to Chapter...' className='link item'>
        <Dropdown.Menu>
          { this.renderChapterMenuItems(this.props.chapters) }
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}