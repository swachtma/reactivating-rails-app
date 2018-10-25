import React, { Component } from 'react';
import CodeFull from './code_full';
import CodeCollapsed from './code_collapsed';

const codeSectionStyle = {
  display: "table-row",
  padding: "0 5px",
  lineHeight: "100%"
};

const codeGutterStyle = {
  display: "table-cell",
  padding: "0 5px"
};

const codeBodyStyle = {
  margin: 0,
  display: "table-cell",
  width: "100%",
  paddingRight: "10px",
};

class CodeSection extends Component {
  constructor(props){
    super(props);
    if(props.priority === "low"){
      this.minimizedContent = props.contents[0];
      this.state = {collapsed: true};
    } else { this.state = {collapsed: false} }
  }

  renderSectionContent = () => {
    let p = this.props;
    return this.state.collapsed ? <CodeCollapsed {...p} /> : <CodeFull {...p} />;
  }
  
  toggleCollapse = (e) => {
    if(this.props.priority === "low"){
      this.setState({collapsed: !this.state.collapsed});
    }
  };
  
  setCollapse = (bool) => {
    if(this.props.priority === "low"){
      this.setState({collapsed: bool});
    }
  };
  
  render() {
    let priority = this.props.priority;
    let icon = this.state.collapsed ? "plus" : "minus"; 
    
    return (
      <div className={priority+"PrioritySection"} onClick={this.toggleCollapse} style={codeSectionStyle}>
        <div className="codeGutter" style={codeGutterStyle}>
          <i className={"fa fa-"+ icon +"-square-o"}></i>
        </div>
        <div className="codeBody" style={codeBodyStyle} id={this.props.section_id}>
          { this.renderSectionContent() }
        </div>
      </div>
    );
  }
}

export default CodeSection;