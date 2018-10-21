import React, { Component } from 'react';
import './App.css'

import ReaderPane from './components/reader_pane';
import MenuBar from './components/menu_bar';
import FilteredNodesList from './containers/filtered_nodes_list';

class App extends Component {
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

export default App;