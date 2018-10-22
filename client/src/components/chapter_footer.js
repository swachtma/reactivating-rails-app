import React, { Component } from 'react';
import Link from 'redux-first-router-link';

import * as actions from '../actions/routes.js';

const chapter_footer_style = {
  margin: "30px 0",
  textAlign: "center",
};

class ChapterFooter extends Component {
  
  renderLinkOrThanks = (next_chapter) => {
    let thanks = "The End - Thank you for Reading!";
    return next_chapter ? 
      <Link to={actions.routeChapter(next_chapter.id)}>
        Next - {next_chapter.title}
      </Link> : thanks;
  }
  
  render() {
    return (
      <div id="chapter-footer-link" style={chapter_footer_style}>
        <h2>
          { this.renderLinkOrThanks(this.props.next_chapter) }
        </h2>
      </div>
    );
  }
}

export default ChapterFooter;