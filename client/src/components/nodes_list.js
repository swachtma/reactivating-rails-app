import React, { PureComponent } from 'react';
import Fragment from 'react-dom-fragment';
import { array } from 'prop-types';
import MarkdownIt from 'markdown-it';

import CodeExample from '../containers/code_example';

const md = new MarkdownIt();

export default class NodesList extends PureComponent {
  static propTypes = { nodes: array }
  
  renderNodes = (nodes) => nodes.map((node) =>
      node.node_type === "code_block" ?
      <CodeExample key={"node_" + node.id} node={node} /> :
      <Fragment key={"node_" + node.id} dangerouslySetInnerHTML={{__html: md.render(node.content)}} />
  );

  render(){
    const { nodes } =  this.props;
    return <div id="nodes-list">{ this.renderNodes(nodes) }</div>;
  }
}
