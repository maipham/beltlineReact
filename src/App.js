import React, { Component } from 'react';
import './App.css';
import {Login} from './Login.js';
import  {RegistrationNav} from "./RegistrationNav";
import {VisitHistory} from "./VisitHistory";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <VisitHistory />
        </header>
      </div>
    );
  }
}

export default App;
