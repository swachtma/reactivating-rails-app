import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      book_body: ["Loading, please wait..."]
    };
  }

  componentWillMount(){
    axios.get("/api/book").then(response =>
      this.setState(
        prevState => ({book_body: response.data.payload})
      )
    ).catch(error => console.log(error));
  }
  
  renderContentBlocks = (content) => 
    content.map((block,i) => <p key={i}>{block}</p>);

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          { this.renderContentBlocks(this.state.book_body) }
        </div>
      </div>
    );
  }
}

export default App;