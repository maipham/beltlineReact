import React, {Component} from 'react';
import './FunctionalityView.css';
import Button from "@material-ui/core/es/Button/Button";
import {view_options} from "../../entities/ViewOptions";
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";
import {VisitHistory} from "../VisitHistory/VisitHistory";

export default class FunctionalityView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin : false,
            isStaff : false,
            isManager : false,
            isVisitor : false,
            isUser : true,
            isEmployee : false
        };
    }

    showFunctionalityOps(hash) {

        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/get_user_info?username=' + hash;
        console.log(hash);
        hr.open('GET', url);
        hr.onreadystatechange = (e) => {
             console.log(e);
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat);
                const response = ret_dat[0];
                const temp_state = {
                    isAdmin : false,
                    isStaff : false,
                    isManager : false,
                    isVisitor : false,
                    isUser : true,
                    isEmployee : false
                };
                for (let i = 0; i < response.length; i++) {
                    const cur_resp = response[i];
                    if (cur_resp === 'Employee') {
                        temp_state.isEmployee = true;
                    }
                    if (cur_resp === 'Manager') {
                        temp_state.isManager = true;
                    }
                    if (cur_resp === 'Admin') {
                        temp_state.isAdmin = true;
                    }
                    if (cur_resp === 'Visitor') {
                        temp_state.isVisitor = true;
                    }
                    if (cur_resp === 'Staff') {
                        temp_state.isStaff = true;
                    }
                }
                this.setState(temp_state);

            }
        };
        hr.send();


    }


    render() {
        const button = {
            width: '200px'
        };

        const item = {
            width: 'fit-content'
        };
        const hash = this.props.location.hash;
        this.showFunctionalityOps(hash.substring(1));
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Functionality</h1></Grid>
                <Grid container={true}
                      justify='center'
                      spacing={16}>
                    {this.state.isEmployee ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_profile'}>Manage
                                Profile</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_user'}>Manage
                                Users</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_transit'}>Manage
                                Transit</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_site'}>Manage
                                Site</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_event'}>Manage
                                Event</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_staff'}>View
                                Staff</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/site_report'}>View Site
                                Report</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isStaff ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/view_schedule'}>View
                                Schedule</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/explore_event'}>Explore
                                Event</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/explore_site'}>Explore
                                Site</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/visit_history'}>View Visit
                                History</Button>
                        </Grid>
                        : null
                    }
                    <Grid item={true} container justify='center' style={item} xs={4}>
                        <Button variant="contained" style={button} component={Link} to={'/take_transit'}>Take
                            Transit</Button>
                    </Grid>
                    <Grid item={true} container justify='center' style={item} xs={4}>
                        <Button variant="contained" style={button} component={Link} to={'/transit_history'}>View Transit
                            History</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
