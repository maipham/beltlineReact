import React, {Component} from 'react';
import './App.css';
import {Login} from './components/Login.js';
import {RegistrationNav} from "./RegistrationNav";
import {VisitHistory} from "./components/VisitHistory";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {User} from "./entities/User";
import {Visitor} from "./entities/Visitor";

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header"/>
                    <Route path="/visit_history" component={VisitHistory}/>
                </div>
            </Router>
        );
    }
}

export default App;
