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
import {AdminCreateSite} from "./components/AdminCreateSite/AdminCreateSite";
import {AdminCreateTransit} from "./components/AdminCreateTransit/AdminCreateTransit";
import {AdminManageTransit} from "./components/AdminManageTransit/AdminManageTransit";
import {ManagerCreateEvent} from "./components/ManagerCreateEvent/ManagerCreateEvent";
import {ManagerManageEvent} from "./components/ManagerManageEvent/ManagerManageEvent";
import {AdminEditTransit} from "./components/AdminEditTransit/AdminEditTransit";
import {ManagerManageStaff} from "./components/ManagerManageStaff/ManagerManageStaff";
import {StaffViewSchedule} from "./components/StaffViewSchedule/StaffViewSchedule";

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
                    <Route path="/create_site" component={AdminCreateSite} />
                    <Route path="/create_transit" component={AdminCreateTransit} />
                    <Route path="/manage_transit" component={AdminManageTransit} />
                    <Route path="/create_event" component={ManagerCreateEvent} />
                    <Route path="/manage_event" component={ManagerManageEvent} />
                    <Route path="/edit_transit" component={AdminEditTransit} />
                    <Route path="/manage_staff" component={ManagerManageStaff} />
                    <Route path="/view_schedule" component={StaffViewSchedule} />
                </div>
            </Router>
        );
    }
}

export default App;
