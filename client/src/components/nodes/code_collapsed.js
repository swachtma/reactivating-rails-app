/* global hljs */
import React, { Component } from 'react';

class CodeCollapsed extends Component {
  componentDidMount(){
    hljs.highlightBlock(document.getElementById(this.props.section_id+"_collapsed"));
  }
  
  render() {
    let contents = this.props.contents;
    return (
      <code id={this.props.section_id+"_collapsed"}>
        <pre className={this.props.block_type}>
          <div>
            {contents[0]} 
            <i className="fa fa-arrows-h" aria-hidden="true"></i>
            {contents[contents.length-1].trim()}
            </div>
        </pre>
      </code>
    );
  }
}

export default CodeCollapsed;