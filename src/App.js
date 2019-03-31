import React, { Component } from 'react';
import './App.css';
import {Button} from './Button.js';
import {Login} from './Login.js';

function a() {
  alert("boom?");
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Login />
        </header>
      </div>
    );
  }
}

export default App;
