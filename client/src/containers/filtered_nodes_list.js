import React, { Component } from 'react';
import { connect } from 'react-redux';
import NodesList from '../components/nodes_list';

export const nodesProvider = (WrappedComponent = NodesList) => 
  class extends Component {
    static displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    
    render(){
      const { nodes, active_chapter_id } = this.props;
      const node_list = nodes.filter(n => n.chapter_id === active_chapter_id);
      return node_list && node_list.length ? <WrappedComponent nodes={node_list} /> : null;
    }
  };

const mapStateToProps = (state) => ({
  nodes: state.nodes,
  active_chapter_id: state.settings.active_chapter_id
});

export const connectToNodes = (WrappedComponent) =>
  connect(mapStateToProps, null)(nodesProvider(WrappedComponent));
  
export default connectToNodes();