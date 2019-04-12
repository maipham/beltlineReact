import React, { Component } from 'react';
import './App.css';
import {Login} from './Login.js';
import  {RegistrationNav} from "./RegistrationNav";
import {VisitHistory} from "./components/VisitHistory";
import {Router} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

          <VisitHistory/>
        </header>
         <Router>


         </Router>
      </div>
    );
  }
}

export default App;
