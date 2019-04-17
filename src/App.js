import React, {Component} from 'react';
import './App.css';
import {VisitHistory} from "./components/VisitHistory";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {User} from "./entities/User";
import {Visitor} from "./entities/Visitor";
import {Register_view} from "./components/RegisterView/Register_view"
import { User_take_transit } from './components/UserTakeTransit/User_take_transit';
import {BrowserRouter as Router, Route} from "react-router-dom";
import FunctionalityView from "./components/FunctionalityView/FunctionalityView";
import {Login} from "./components/Login";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {authenticated : false};
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Route path="/visit_history" component={VisitHistory}/>
                    <Route path="/register" component={Register_view}/>
<<<<<<< HEAD
                    <Route path="/take_transit" component={User_take_transit}></Route>
=======
                    <Route path="/functionality" component={FunctionalityView}/>
                    <Route path="/login" component={Login}/>
>>>>>>> ef366115f7ea76820c5e337b7fa7983bef67d9bb
                </div>
            </Router>
        );
    }
}

export default App;
