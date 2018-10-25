import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
import CodeBlock from './nodes/code_block';

const md = new MarkdownIt();

class NodesList extends Component {
  renderNodes = (nodes) => {
    let nodes_list = [];
    nodes.forEach((node) => {
      switch (node.node_type) {
        case("code_block"):
          return nodes_list.push(
            <CodeBlock key={"node_" + node.id} node={node} />
          );
        default:
          return nodes_list.push(
            <p 
              key={"node_" + node.id} 
              dangerouslySetInnerHTML={{__html: md.render(node.content)}}
            />
            );
      }
    });
    return nodes_list;
  }
  
  render() {
    return (
      <div id="nodes_list">
        { this.renderNodes(this.props.nodes) }
      </div>
    );
  }
}

export default NodesList;