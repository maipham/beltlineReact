import React, { Component } from 'react';
import './App.css';
import {Login} from './Login.js';
import  {RegistrationNav} from "./RegistrationNav";
import {VisitHistory} from "./components/VisitHistory";
import {Router} from "react-router-dom";
import {Register_view} from "./components/RegisterView/Register_view";

class App extends Component {
  render() {
    return (
      <div className="App">
         {/* <Router>


         </Router> */}
         <Register_view />
      </div>
    );
  }
}

export default App;
