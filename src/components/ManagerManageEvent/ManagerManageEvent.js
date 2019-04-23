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

export class ManagerManageEvent extends Component {
    hr = new XMLHttpRequest();
    url = 'http://localhost:5000/m_manage_event';
    hash = null;
    eventHash = '';

    constructor(props) {
        super(props);
        this.hash = props.location.hash;
        this.state = {
            name: '',
            keyword: '',
            startDate: '',
            endDate: '',
            durationLow: '',
            durationHigh: '',
            visitLow: '',
            visitHigh: '',
            revenueLow: '',
            revenueHigh: '',
            selected: -1,
            data: [],
            site_name: ''
        }

    }

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        // this.eventHash =
        console.log(this.state.data[i]);
        const chosenEvent = this.state.data[i];
        this.eventHash = '/' + chosenEvent.event_name + '/' + chosenEvent.start_date;
        console.log(this.eventHash);
        this.setState({
            selected: i
        })
        console.log(this.state.site_name)
    };

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    onKeywordChange = (event) => {
        this.setState({
            keyword: event.target.value
        });
    };

    onStartDateChange = (event) => {
        this.setState({
            startDate: event.target.value
        });
    };

    onEndDateChange = (event) => {
        this.setState({
            endDate: event.target.value
        });
    };

    onDurationLowChange = (event) => {
        this.setState({
            durationLow: event.target.value
        });
    };

    onDurationHighChange = (event) => {
        this.setState({
            durationHigh: event.target.value
        });
    };

    onRevenueLowChange = (event) => {
        this.setState({
            revenueLow: event.target.value
        });
    };

    onRevenueHighChange = (event) => {
        this.setState({
            revenueHigh: event.target.value
        });
    };

    onVisitLowChange = (event) => {
        this.setState({
            visitLow: event.target.value
        });
    };

    onVisitHighChange = (event) => {
        this.setState({
            visitHigh: event.target.value
        });
    };

    componentDidMount() {
        this.hr.open('GET', this.url);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                console.log(data[0]);
                this.setState({
                    data: data,
                    site_name: data[0].site_name
                });
                console.log(this.state);
            }
        };

        this.hr.send();
    }

    render() {
        return (
            <div>
                {/*container for header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Manage Event</h1>
                    </Grid>
                </Grid>

                {/*container for the name and the description keyword text fields*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item style={{marginRight: '0px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Name</InputLabel>
                        <TextField onClick={this.onNameChange}/>
                    </Grid>

                    <Grid item style={{marginLeft: '30px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Description Keyword</InputLabel>
                        <TextField onClick={this.onKeywordChange}/>
                    </Grid>
                </Grid>

                {/*container for the start date and the end date text fields*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item style={{marginRight: '10px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Start Date</InputLabel>
                        <TextField id="startdate"
                                   type="date"
                                   defaultValue="01/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.onStartDateChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '10px'}}>End Date</InputLabel>
                        <TextField id="enddate"
                                   type="date"
                                   defaultValue="12/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.onEndDateChange}/>
                    </Grid>
                </Grid>

                {/*container for the duration range  and the visit range text fields*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item style={{marginRight: '15px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Duration Range</InputLabel>
                        <TextField style={{width: '40px', marginRight: '10px'}}onClick={this.onDurationLowChange}/>
                        <TextField style={{width: '40px', marginLeft: '10px'}} onClick={this.onDurationHighChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '10px'}}>Total Visits Range</InputLabel>
                        <TextField style={{width: '40px', marginRight: '10px'}} onClick={this.onVisitLowChange}/>
                        <TextField style={{width: '40px', marginLeft: '10px'}} onClick={this.onVisitHighChange}/>
                    </Grid>
                </Grid>

                {/*container for the revenue range text fields*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item>
                        <InputLabel style={{marginRight: '10px'}}>Total Revenue Range</InputLabel>
                        <TextField style={{width: '40px', marginRight: '10px'}} onClick={this.onRevenueLowChange}/>
                        <TextField style={{width: '40px', marginLeft: '10px'}} onClick={this.onRevenueHighChange}/>
                    </Grid>
                </Grid>

                {/*container that holds the BUTTONS filter, create, view/edit, and delete*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item style={{marginRight: '150px'}}>
                        <Button color="primary" variant="contained">Filter</Button>
                    </Grid>

                    <Grid item style={{marginRight: '20px'}}>
                        <Button color="primary" variant="contained"  component={Link}
                                to={{pathname: '/create_event', hash: this.hash, state: {
                                    }}}
                        >Create Event</Button>
                    </Grid>

                    <Grid item style={{marginRight: '20px'}}>
                        <Button disabled={this.state.selected < 0} color="primary" variant="contained"  component={Link}
                                to={{pathname: '/view_edit_event', hash: this.hash + this.eventHash,
                                state: {
                                    site_name : this.state.site_name
                                    }}}

                        >View/Edit</Button>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained">Delete</Button>
                    </Grid>
                </Grid>

                {/*container that holds the buttons filter, create, view/edit, and delete*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Staff Count</TableCell>
                                    <TableCell align="right">Duration (days)</TableCell>
                                    <TableCell align="right">Total Visits</TableCell>
                                    <TableCell align="right">Total Revenue</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.data.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow hover
                                                      aria-checked={!(() => this.isSelected(i))}
                                                      selected={isSelected}
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{transit.event_name}</TableCell>
                                        <TableCell align="right">{transit.staff_count}</TableCell>
                                        <TableCell align="right">{transit.duration}</TableCell>
                                        <TableCell align="right">{transit.total_visits}</TableCell>
                                        <TableCell align="right">{transit.total_revenue}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                {/*container to hold the back button*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item>
                        <Button color="primary" variant="contained" style={{width: '100px'}}>Back</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

}