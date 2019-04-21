import React, {Component} from 'react';
import './App.css';
import {VisitHistory} from "./components/VisitHistory";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Register_view} from "./components/RegisterView/Register_view"
import FunctionalityView from "./components/FunctionalityView/FunctionalityView";
import {Login} from "./components/Login/Login";
import RegisterNav from "./components/RegisterNav/RegisterNav";

class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/visit_history" component={VisitHistory}/>
                    <Route path="/register" component={Register_view}/>
                    <Route path="/functionality" component={FunctionalityView}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/reg_nav" component={RegisterNav}/>
                </div>
            </Router>
        );
    }
}

export default App;
