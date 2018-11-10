	
import React, { Component } from 'react';
import clipboardJS from 'clipboard'
import CodeFence from './lib/code_fence';
import CodeHeader from './code_header';
import CodeSection from './code_section';
 
const codeBlockStyle = {
  marginBottom: "16px"
};
 
const blockBodyStyle = {
  padding: "10px 0",
  border: "1px solid #021a40",
  backgroundColor: "#F0F0F0",
  overflowX: "scroll"
};
 
class CodeBlock extends Component {
  constructor(props){
    super(props);
    this.code_fence = new CodeFence(props.node);
  }
  
  renderHeaderIf = (block_path) => {
    if(block_path){ return( 
      <CodeHeader 
        block_path={this.code_fence.block_path} 
        collapseHandler={this.collapseSections}
        triggerRef={(trigger) => this.triggerCopy = trigger} 
      />
    )}
  };
  
  renderCodeSections = (sections) => {
    this.section_refs = [];
    return Array.from(sections, s => {
      return(
        <CodeSection ref={s => this.section_refs.push(s)} block_type={this.code_fence.block_type} priority={s.priority}
        contents={s.contents} key={s.section_id} section_id={s.section_id} />
      );
    });
  };
  
  componentDidMount(){
    if(this.triggerCopy){
      let button = this.triggerCopy.querySelector("button.copy");
      return new clipboardJS(button, {
        text: () => this.code_fence.copy
      });
    }
  }
  
  collapseSections = (bool) => {
    this.section_refs.forEach((ref) => {
      if(ref){ ref.setCollapse(bool) }
    });
  };
  
  render() {
    return (
      <div style={codeBlockStyle} key={"code_fence_" + this.props.node.id}
      id={"code_block_" + this.code_fence.node_id} className={"language-"+this.code_fence.block_type}>
        { this.renderHeaderIf(this.code_fence.block_path) } 
        <div style={blockBodyStyle}>
          { this.renderCodeSections(this.code_fence.sections) }
        </div>
      </div>
    );
  }
}
 
export default CodeBlock;