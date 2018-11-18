import React, { Component } from 'react';
import { shape, number, string, array, func } from 'prop-types';

import CodeHeader from './code_header';
import CodeSection from './code_section';

const styles = {
  codeBlockStyle: {
    margin: "1.5em 0"
  },
  blockBodyStyle: {
    padding: "10px 0",
    border: "1px solid #021a40",
    backgroundColor: "#F0F0F0",
    overflowX: "scroll"
  }
};

export default class CodeBlock extends Component {
  static propTypes = {
    collapseSections: func,
    attachCopyTrigger: func,
    addSectionRef: func.isRequired,
    node: shape(
      { node_id: number, block_type: string, block_path: string, sections: array }
    ).isRequired
  };

  renderCodeSections = () => {
    let { addSectionRef, node } = this.props;
    return Array.from(node.sections, s => 
      <CodeSection ref={addSectionRef} block_type={node.block_type} 
      priority={s.priority} contents={s.contents} key={s.section_id} section_id={s.section_id} />
    );
  };
  
  render() {
    let { collapseSections, attachCopyTrigger, node } = this.props;
    let { node_id, block_type, block_path } = node;

    return (
      <div style={styles.codeBlockStyle} key={"code_fence_" + node_id}
      id={"code_block_" + node_id} className={"language-" + block_type}>
        { block_path && 
          <CodeHeader block_path={block_path} collapseHandler={collapseSections}
          triggerRef={attachCopyTrigger} /> 
        } 
        <div style={styles.blockBodyStyle}>
          { this.renderCodeSections() }
        </div>
      </div>
    );
  }
}