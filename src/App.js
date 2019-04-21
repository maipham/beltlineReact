import React, {Component} from 'react';
import './App.css';
import {VisitHistory} from "./components/VisitHistory";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Register_view} from "./components/RegisterView/Register_view"
import FunctionalityView from "./components/FunctionalityView/FunctionalityView";
import {Login} from "./components/Login";
import RegisterNav from "./components/RegisterNav/RegisterNav";
import ViewEditEvent from "./components/ViewEditEvent/ViewEditEvent";
import SiteReport from "./components/SiteReport/SiteReport";

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
                    <Route path="/view-edit0event" component={ViewEditEvent}/>
                    <Route path="/site-report" component={SiteReport}/>
                </div>
            </Router>
        );
    }
}

export default App;
