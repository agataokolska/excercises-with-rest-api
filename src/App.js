import React, { Component } from 'react';
import './App.css';
import List from './List'
import ListwithFetch from './ListwithFetch'

class App extends Component {
  render() {
    return (
      <div className="App">
       <ListwithFetch/>
      </div>
    );
  }
}

export default App;
