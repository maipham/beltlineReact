import React, {Component} from 'react';
import './App.css';
import {VisitHistory} from "./components/VisitHistory";
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
                    {/*<header className="App-header"/>*/}
                    <Route path="/visit_history" component={VisitHistory}/>
                    <Route path="/functionality" component={FunctionalityView}/>
                    <Route path="/login" component={Login}/>
                </div>
            </Router>
        );
    }
}

export default App;
