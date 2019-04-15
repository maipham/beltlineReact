import React, {Component} from 'react';
import './App.css';
import {Login} from './components/Login.js';
import {RegistrationNav} from "./RegistrationNav";
import {VisitHistory} from "./components/VisitHistory";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {User} from "./entities/User";
import {Visitor} from "./entities/Visitor";
import {Register_view} from "./components/RegisterView/Register_view"
import { User_take_transit } from './components/UserTakeTransit/User_take_transit';

class App extends Component {

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/visit_history" component={VisitHistory}/>
                    <Route path="/register" component={Register_view}/>
                </div>
            </Router>
        );
    }
}

export default App;
