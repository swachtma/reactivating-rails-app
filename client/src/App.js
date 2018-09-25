import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { loadNodes } from './actions/nodes';
import ReaderPane from './components/reader_pane';
import MenuBar from './components/menu_bar';
import FilteredNodesList from './containers/filtered_nodes_list';
import './App.css';

const mapDispatchToProps = (dispatch) => ({
  dispatchLoadNodes: (payload) => dispatch(loadNodes(payload))
});

class App extends Component {
  componentWillMount(){
    axios.get("/api/nodes")
    .then(
      (response) => {
        this.props.dispatchLoadNodes(response.data);
      }
    )
    .catch(
      (error) => {
        console.log(error);
      }
    );
  }
  
  renderContentBlocks = (content) => {
    let content_blocks = [];
    content.forEach((block) => {content_blocks.push(<p key={content_blocks.length}>{block.content}</p>)});
    return content_blocks;
  }
  
  render() {
    return (
      <div id="app">
      <MenuBar />
        <ReaderPane>
          <FilteredNodesList />
        </ReaderPane>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);