import React, { Component } from 'react';
import { shape, number, string } from 'prop-types';
import clipboardJS from 'clipboard';

import CodeFence from './lib/code_fence';
import CodeBlock from '../components/nodes/code_block';


class CodeExample extends Component {
  static propTypes = {
    node: shape({ id: number, content: string }).isRequired
  };
  
  constructor(props){
    super(props);
    this.code_fence = new CodeFence(props.node);
    this.section_refs = [];
  }
  
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
  }
  
  addSectionRef = s => this.section_refs.push(s);
  
  attachCopyTrigger = (trigger) => this.triggerCopy = trigger;
  
  render() {
    let node = {
      block_type: this.code_fence.block_type,
      block_path: this.code_fence.block_path,
      sections: this.code_fence.sections
    };
    
    return (
      <CodeBlock 
        node={node} section_refs={this.section_refs}
        collapseSections={this.collapseSections} addSectionRef={this.addSectionRef}
        attachCopyTrigger={this.attachCopyTrigger}
      />
    );
  }
}

export default CodeExample;