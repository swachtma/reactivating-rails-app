import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadNodes } from './actions/nodes';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

const mapStateToProps = (state) => ({
  book_body: state.nodes
});

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
    content.forEach((block) => {
      content_blocks.push(<p key={content_blocks.length}>{block.content}</p>)
    });
    return content_blocks;
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Reactivating Rails: A work in progress</h2>
        </div>
        <div className="App-intro">
          { this.renderContentBlocks(this.props.book_body) }
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);