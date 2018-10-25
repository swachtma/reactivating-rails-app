/* global hljs */
import React, { Component } from 'react';

class CodeFull extends Component {
  componentDidMount(){
    hljs.highlightBlock(document.getElementById(this.props.section_id+"_full"));
  }
  
  render() {
    return (
      <code id={this.props.section_id+"_full"}>
        <pre className={this.props.block_type}>{this.props.contents.join("\n")}</pre>
      </code>
    );
  }
}

export default CodeFull;