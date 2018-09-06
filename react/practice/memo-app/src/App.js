import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Memo from "./components/Memo";

class App extends Component {
  render() {
    return (
      <div className="App">
        App component

        <Memo />
      </div>
    );
  }
}

export default App;
