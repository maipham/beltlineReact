import React, {Component} from 'react';
import './App.css';
import {VisitHistory} from "./components/VisitHistory";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {Register_view} from "./components/RegisterView/Register_view"
import FunctionalityView from "./components/FunctionalityView/FunctionalityView";
import {Login} from "./components/Login";
import {User_take_transit} from "./components/UserTakeTransit/User_take_transit";
import {TransitHistory} from "./components/TransitHistory/TransitHistory";
import {EmployeeManageProfile} from "./components/EmployeeManageProfile/EmployeeManageProfile";
import {AdminManageUser} from "./components/AdminManageUser/AdminManageUser";
import {ManageSite} from "./components/AdminManageSite/AdminManageSite";
import {AdminEditSite} from "./components/AdminEditSite/AdminEditSite";

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
                    <Route path="/functionality" component={FunctionalityView}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/take_transit" component={User_take_transit} />
                    <Route path="/transit_history" component={TransitHistory} />
                    <Route path="/manage_profile" component={EmployeeManageProfile} />
                    <Route path="/manage_user" component={AdminManageUser} />
                    <Route path="/manage_site" component={ManageSite} />
                    <Route path="/edit_site" component={AdminEditSite} />
                </div>
            </Router>
        );
    }
}

export default App;
