import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import React, { Component } from 'react';
import {Link} from "react-router-dom";

const site_names = ['ALL','Piedmont Park', 'Atlanta Park', 'Atlanta Beltline Center', 'Historic Fourth Ward Park', 'Westview Cementary', 'Inman Park'];

export class StaffViewSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initSchedule: [],
            filterSchedule: [],
            selected: null,
            currUser: props.location.hash === null ? null : props.location.hash.slice(1)
        }
        console.log(props.location.hash);
    }

    handleStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }

    handleEndDate = (event) => {
        this.setState({endDate: event.target.value});
    }

    handleEventName = (event) => {
        this.setState({
            eventName: event.target.value
        });
    };

    handleKeyword = (event) => {
        this.setState({
            keyword: event.target.value
        });
    };

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        if (this.state.selected === i) {
            this.setState({
                selected: null
            })
        } else {
            this.setState({
                selected: i
            })
        }
    };

    componentDidMount() {
        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/s_view_schedule?';

        hr.open('GET', url + "staff_username=" + this.state.currUser);

        hr.onreadystatechange = (event) => {
            {/* Stage 4 is ready state, status 200 is ready status */}
            if (event.target.readyState === 4 && event.target.status === 200) {
                {/*Response Text is data from backend*/}
                const data = JSON.parse(event.target.responseText);
                this.setState({
                    initSchedule: data,
                    filterSchedule: data
                });
                console.log(data);
            }
        };

        hr.send();
    }

    // processData = (data) => {
    //     for (let i = 0; i < data.length; i++) {
    //         const row = data[i];
    //         this.state.
    //     }
    // }

    handleGoBack = (event) => {
        let pathname = "/functionality";
        this.props.history.push(pathname);
    }

    handleViewEvent = (event) => {
        let pathname = "/"
    }

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1>View Schedule</h1>
                    </Grid>
                </Grid>

                {/*container for the first name and the last name*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '45px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Event Name</InputLabel>
                        <TextField onClick={this.handleEventName}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>Description Keyword</InputLabel>
                        <TextField onClick={this.handleKeyword}/>
                    </Grid>
                </Grid>

                {/*container for the start date and the end date*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '80px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Start Date</InputLabel>
                        <TextField id="startdate"
                                   type="date"
                                   defaultValue="01/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleStartDate}/>
                    </Grid>
                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>End Date</InputLabel>
                        <TextField id="enddate"
                                   type="date"
                                   defaultValue="01/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleEndDate}/>
                    </Grid>
                </Grid>

                {/*container for the filter button*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '150px'}}>
                        <Button color="primary" variant="contained">Filter</Button>
                    </Grid>

                    <Grid item>
                        <Button variant="contained"  component={Link} color="primary"
                                to={{pathname: '/staff_event_detail', hash: this.hash}}>View Event</Button>
                    </Grid>
                </Grid>

                {/*container for the table*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Event Name</TableCell>
                                    <TableCell align="right">Site Name</TableCell>
                                    <TableCell align="right">Start Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                    <TableCell align="right">Staff Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.filterSchedule.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow selected={isSelected}
                                                      hover
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{transit.event_name}</TableCell>
                                        <TableCell align="right">{transit.site_name}</TableCell>
                                        <TableCell align="right">{transit.start_date}</TableCell>
                                        <TableCell align="right">{transit.end_date}</TableCell>
                                        <TableCell align="right">{transit.staff_count}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                {/*container for the back button*/}
                <Grid style={{marginTop: '40px'}} container justify="center">
                    <Grid item>
                        <Button onClick = {this.handleGoBack} style={{width: '100px'}} color="primary" variant="contained">Back</Button>
                    </Grid>
                </Grid>

            </div>
        )
    }
}