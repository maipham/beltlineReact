import React, {Component} from 'react';
import './FunctionalityView.css';
import Button from "@material-ui/core/es/Button/Button";
import {view_options} from "../../entities/ViewOptions";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {VisitHistory} from "../VisitHistory/VisitHistory";

export default class FunctionalityView extends Component {
    _isMounted = false;
    hash = null;
    constructor(props) {
        super(props);
        this.hash = props.location.hash.substring(1);
        this.state = {
            isAdmin : false,
            isStaff : false,
            isManager : false,
            isVisitor : false,
            isUser : true,
            isEmployee : false
        };
        // console.log(props.location.hash);
    }
    componentDidMount() {
        this._isMounted = true;

        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/get_user_info?username=' + this.hash;
        console.log(this.hash);
        hr.open('GET', url);
        hr.onreadystatechange = (e) => {
            // console.log(e);
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
                    if (cur_resp === 'Employee, Visitor') {
                        temp_state.isAdmin = true;
                        temp_state.isVisitor = true;
                    }
                }
                this.setState(temp_state);

            }
        };
        hr.send();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }



    render() {
        const button = {
            width: '200px'
        };

        const item = {
            width: 'fit-content'
        };
        // const hash = this.props.location.hash;
        // this.showFunctionalityOps(hash.substring(1));
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Functionality</h1></Grid>
                <Grid container={true}
                      justify='center'
                      spacing={16}>
                    {this.state.isEmployee ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/manage_profile', hash: this.hash}}
                            >Manage
                                Profile</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/manage_user', hash: this.hash}}
                            >Manage
                                Users</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/manage_transit', hash: this.hash}}
                            >Manage
                                Transit</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/manage_site', hash: this.hash}}
                            >Manage
                                Site</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/manage_event', hash: this.hash}}
                            >Manage
                                Event</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/manage_staff', hash: this.hash}}
                            >View
                                Staff</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/site_report', hash: this.hash}}
                            >View Site
                                Report</Button>
                        </Grid>
                        : null
                    }

                    {this.state.isStaff ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/view_schedule', hash: this.hash}}
                            >View
                                Schedule</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/explore_event', hash: this.hash}}
                            >Explore
                                Event</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/explore_site', hash: this.hash}}
                            >Explore
                                Site</Button>
                        </Grid>
                        : null
                    }
                    {this.state.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link}
                                    to={{pathname: '/visit_history', hash: this.hash}}
                            >View Visit
                                History</Button>
                        </Grid>
                        : null
                    }
                    <Grid item={true} container justify='center' style={item} xs={4}>
                        <Button variant="contained" style={button} component={Link}
                                to={{pathname: '/take_transit', hash: this.hash}}
                        >Take
                            Transit</Button>
                    </Grid>
                    <Grid item={true} container justify='center' style={item} xs={4}>
                        <Button variant="contained" style={button} component={Link}
                                to={{pathname: '/transit_history', hash: this.hash}}
                        >View Transit
                            History</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
