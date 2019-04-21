import React, {Component} from 'react';
import './FunctionalityView.css';
import Button from "@material-ui/core/es/Button/Button";
import {view_options} from "../../entities/ViewOptions";
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";
import {VisitHistory} from "../VisitHistory/VisitHistory";

export default class FunctionalityView extends Component {
    isAdmin = false;
    isStaff = false;
    isManager = false;
    isVisitor = false;
    isUser = true;
    isEmployee = false;

    constructor(props) {
        super(props);
        this.state = {
            view_options: view_options,
            userType: "Staff"
        };
        console.log(props.location.hash);
    }

    showFunctionalityOps(hash) {
        const hr = new XMLHttpRequest();
        // const url = 'http://localhost:5000/?';

    }


    render() {
        const styles = {
            width: 100 + 'vw',
            height: 100 + 'vh',
            // backgroundColor: '#8c9eff',
            // fontSize: this._textSize + 'px',
            // fontFamily: 'Quicksand, sans-serif'
        };
        const button = {
            width: '200px'
        };

        const item = {
            width: 'fit-content'
        };
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Functionality</h1></Grid>
                <Grid container={true}
                      justify='center'
                      spacing={16}>
                    {this.isEmployee ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_profile'}>Manage
                                Profile</Button>
                        </Grid>
                        : null
                    }
                    {this.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_user'}>Manage
                                Users</Button>
                        </Grid>
                        : null
                    }

                    {this.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_transit'}>Manage
                                Transit</Button>
                        </Grid>
                        : null
                    }

                    {this.isAdmin ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_site'}>Manage
                                Site</Button>
                        </Grid>
                        : null
                    }
                    {this.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_event'}>Manage
                                Event</Button>
                        </Grid>
                        : null
                    }

                    {this.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/manage_staff'}>View
                                Staff</Button>
                        </Grid>
                        : null
                    }
                    {this.isManager ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/site_report'}>View Site
                                Report</Button>
                        </Grid>
                        : null
                    }

                    {this.isStaff ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/view_schedule'}>View
                                Schedule</Button>
                        </Grid>
                        : null
                    }
                    {this.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/explore_event'}>Explore
                                Event</Button>
                        </Grid>
                        : null
                    }
                    {this.isVisitor ?
                        <Grid item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={'/explore_site'}>Explore
                                Site</Button>
                        </Grid>
                        : null
                    }
                    {this.isVisitor ?
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
