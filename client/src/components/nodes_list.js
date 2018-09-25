import React, { Component } from 'react';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

class NodesList extends Component {
  renderNodes = (nodes) => {
    let nodes_list = [];
    nodes.forEach((node) => {
      nodes_list.push(
        <p key={"node_" + node.id} dangerouslySetInnerHTML={
          {__html: md.render(node.content)}
        } />
      );
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