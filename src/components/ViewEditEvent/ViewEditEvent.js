import React, {Component} from 'react';
import './ViewEditEvent.css';
import Grid from "@material-ui/core/Grid";
import {mock_events} from "../../mocks/events-mock";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

export default class ViewEditEvent extends Component {
    constructor(props) {
        super(props);
        this.init();
    };

    init() {
        this.state = {
            event: mock_events[0], // pass event from props to this event in state
            allStaffs: ['staff1', 'staff2', 'staff3', 'staff4', 'staff5'], // Call API to get a list of all staffs
            startVisitCount: '',
            endVisitCount: '',
            startRevenue: '',
            endRevenue: '',
            filteredStats: [...mock_events[0].stats],
        };
        this.state.allStaffs.forEach((staff) => {
            this.state[staff] = this.state.event.staffs.includes(staff);
        });
        console.log(this.state);
    }

    render() {
        return (
            <Grid container className={'event-container'}>
                <Grid item md={12}>
                    <Grid container
                          alignItems={'center'}
                          direction={'row'}
                          justify={'center'}>
                        <Grid item md={12}>
                            <h1>View/Edit Event</h1>
                        </Grid>
                        <Grid item md={6}>
                            <strong> Name: </strong> {this.state.event.name}
                        </Grid>
                        <Grid item md={6}>
                            <strong>Price:</strong> {this.state.event.price}
                        </Grid>
                        <Grid item md={6}>
                            <strong>Start Date: </strong> {this.state.event.start_date}
                        </Grid>
                        <Grid item md={6}>
                            <strong>End Date: </strong> {this.state.event.end_date}
                        </Grid>
                        <Grid item md={6}>
                            <strong>Minimum Staff required: </strong> {this.state.event.min_staff}
                        </Grid>
                        <Grid item md={6}>
                            <strong> Capacity: </strong> {this.state.event.capacity}
                        </Grid>
                        <Grid item md={3}>
                            <strong> Staff Assigned </strong>
                        </Grid>
                        <Grid item md={9}>
                            {
                                this.state.allStaffs.map((staff, indx) => {
                                    return (
                                        <div key={indx}>
                                            <Checkbox checked={this.state[staff]}
                                                      onChange={this.handleStaffChecked(staff)}
                                                      value="Checked Value"
                                                      color="primary"/> {staff}
                                        </div>
                                    );
                                })
                            }
                        </Grid>
                        <Grid md={3}>
                            <strong> Description </strong>
                        </Grid>
                        <Grid item md={9}>
                            <TextField
                                className={'description-text'}
                                label="Description"
                                placeholder="Description"
                                onChange={this.handleDescriptionChange}
                                value={this.state.event.description}
                                multiline
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid md={6}>
                            <strong>
                                Daily Visits Range:
                            </strong>
                            <TextField
                                label=""
                                value={this.state.startVisitCount}
                                onChange={this.handleStartVisit}
                                margin="normal"
                            />
                            <strong>
                                to
                            </strong>
                            <TextField
                                label=""
                                value={this.state.endVisitCount}
                                onChange={this.handleEndVisit}
                                margin="normal"
                            />
                        </Grid>
                        <Grid md={6}>
                            <strong>
                                Daily Revenue Range:
                            </strong>
                            <TextField
                                label=""
                                value={this.state.startRevenue}
                                onChange={this.handleStartRevenue}
                                margin="normal"
                            />
                            <strong>
                                to
                            </strong>
                            <TextField
                                label=""
                                value={this.state.endRevenue}
                                onChange={this.handleEndRevenue}
                                margin="normal"
                            />
                        </Grid>
                        <Grid container spacing={24}>
                            <Grid item md={6} spacing={24}>
                                <Button variant="contained" onClick={this.reset}>
                                    Reset
                                </Button>
                                <Button variant="contained" color="primary" onClick={this.filter}>
                                    Filter
                                </Button>
                            </Grid>
                            <Grid item md={6}>
                                <Button variant="contained" color="primary" onClick={this.update}>
                                    Update
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid md={12}>
                            <Paper>
                                <Table className={'event-table'}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Daily Visits</TableCell>
                                            <TableCell>Daily Revenue ($)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.state.filteredStats.map((stat, indx) => (
                                                    <TableRow key={indx}>
                                                        <TableCell>{stat['date']} </TableCell>
                                                        <TableCell>{stat['visits']}</TableCell>
                                                        <TableCell>{stat['revenue']}</TableCell>
                                                    </TableRow>
                                                )
                                            )
                                        }
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        );
    }

    handleStaffChecked = (staff) => (e) => {
        this.setState({
            [staff]: e.target.checked
        });
    }

    handleDescriptionChange = (event) => {
        this.state.event.description = event.target.value;
        this.setState(this.state);
    }

    handleStartVisit = (event) => {
        console.log(event.target.value);
        this.state.startVisitCount = event.target.value;
        this.setState(this.state);
    }

    handleEndVisit = (event) => {
        console.log(event.target.value);
        this.state.endVisitCount = event.target.value;
        this.setState(this.state);
    }

    handleStartRevenue = (event) => {
        console.log(event.target.value);
        this.state.startRevenue = event.target.value;
        this.setState(this.state);
    }

    handleEndRevenue = (event) => {
        console.log(event.target.value);
        this.state.endRevenue = event.target.value;
        this.setState(this.state);
    }

    filter = (event) => {
        console.log(event);
        let startVisit = parseInt(this.state.startVisitCount);
        let endVisit = parseInt(this.state.endVisitCount);
        let startRevenue = parseInt(this.state.startRevenue);
        let endRevenue = parseInt(this.state.endRevenue);
        const visits_filteredStats = [];
        const revenue_filteredStats = [];
        this.state.event.stats.forEach(stat => {
            if (stat.visits >= startVisit && stat.visits <= endVisit) {
                visits_filteredStats.push(stat);
            }
        });
        if (startRevenue && endRevenue) {
            visits_filteredStats.forEach(stat => {
                if (stat.revenue >= startRevenue && stat.revenue <= endRevenue) {
                    revenue_filteredStats.push(stat);
                }
            });
            this.state.filteredStats = [...revenue_filteredStats];
        } else {
            this.state.filteredStats = [...visits_filteredStats];
        }
        this.setState(this.state);
    }

    reset = (event) => {
        this.state.filteredStats = [... this.state.event.stats];
        this.setState(this.state);
    }

    update = (event) => {
        console.log(event);
        console.log(this.state);
    }
}
