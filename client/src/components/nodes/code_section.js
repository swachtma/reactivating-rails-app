import React, { Component } from 'react';
import {string, array, oneOf } from 'prop-types';

import CodeFull from './code_full';
import CodeCollapsed from './code_collapsed';

const styles = {
  codeSectionStyle: {
    display: "table-row",
    padding: "0 5px",
    lineHeight: "100%"
  },
  codeGutterStyle: {
    display: "table-cell",
    padding: "0 5px"
  },
  codeBodyStyle: {
    margin: 0,
    display: "table-cell",
    width: "100%",
    paddingRight: "10px",
  }
};

class CodeSection extends Component {
  static propTypes = {
    section_id: string.isRequired,
    contents: array.isRequired,
    block_type: string,
    priority: oneOf(["low","normal","high"])
  };
  
  constructor(props){
    super(props);
    this.state = {
      collapsed: props.priority === "low" ? true : false
    };
  }
  
  toggleCollapse = (e) => 
    this.props.priority === "low" && this.setState({collapsed: !this.state.collapsed});

  setCollapse = (bool) =>
    this.props.priority === "low" && this.setState({collapsed: bool});
    //called by reference when +/- buttons are clicked in CodeHeader

  render() {
    let { section_id, priority } = this.props;
    let { collapsed } = this.state;
    let icon = collapsed ? "plus" : "minus"; 
    
    return (
      <div className={priority+"PrioritySection"} onClick={this.toggleCollapse} style={styles.codeSectionStyle}>
        <div className="codeGutter" style={styles.codeGutterStyle}>
          <i className={"fa fa-"+ icon +"-square-o"}></i>
        </div>
        <div className="codeBody" style={styles.codeBodyStyle} id={section_id}>
          { collapsed ? <CodeCollapsed {...this.props} /> : <CodeFull {...this.props} /> }
        </div>
      </div>
    );
  }
}

export default CodeSection;