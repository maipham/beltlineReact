import React, {Component} from 'react';
import './SiteReport.css';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {mock_daily_events} from "../../mocks/site-report-mock";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

export default class SiteReport extends Component {
    constructor(props) {
        super(props);
        this.init();
    };

    init() {
        this.state = {
            eventCountRange: ['', ''],
            staffCountRange: ['', ''],
            totalVisitsRange: ['', ''],
            totalRevenueRange: ['', ''],
            selectedDetail: undefined,
            selectedDetailIndx: undefined,
            detail: mock_daily_events,
            filtered: [...mock_daily_events]
        };
        mock_daily_events.forEach(e => {
            this.state[e.date] = false;
        });
    }

    render() {
        return (
            <Grid container spacing={24}>
                <Grid item md={6}>
                    <form noValidate>
                        <TextField
                            label="Start Date"
                            type="date"
                            defaultValue={moment().format('YYYY-MM-DD')}
                            className={'start-date'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Grid>
                <Grid item md={6}>
                    <form noValidate>
                        <TextField
                            label="End Date"
                            type="date"
                            defaultValue={moment().format('YYYY-MM-DD')}
                            className={'end-date'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </form>
                </Grid>
                <Grid md={6}>
                    <strong>
                        Event Count Range:
                    </strong>
                    <TextField
                        label=""
                        value={this.state.eventCountRange[0]}
                        onChange={this.handleEventCountRange('start')}
                        margin="normal"
                    />
                    <strong>
                        to
                    </strong>
                    <TextField
                        label=""
                        value={this.state.eventCountRange[1]}
                        onChange={this.handleEventCountRange('end')}
                        margin="normal"
                    />
                </Grid>
                <Grid md={6}>
                    <strong>
                        Staff Count Range:
                    </strong>
                    <TextField
                        label=""
                        value={this.state.staffCountRange[0]}
                        onChange={this.handleStaffCountRange('start')}
                        margin="normal"
                    />
                    <strong>
                        to
                    </strong>
                    <TextField
                        label=""
                        value={this.state.staffCountRange[1]}
                        onChange={this.handleStaffCountRange('end')}
                        margin="normal"
                    />
                </Grid>
                <Grid md={6}>
                    <strong>
                        Total Visits Range:
                    </strong>
                    <TextField
                        label=""
                        value={this.state.totalVisitsRange[0]}
                        onChange={this.handleTotalVisitRange('start')}
                        margin="normal"
                    />
                    <strong>
                        to
                    </strong>
                    <TextField
                        label=""
                        value={this.state.totalVisitsRange[1]}
                        onChange={this.handleTotalVisitRange('end')}
                        margin="normal"
                    />
                </Grid>
                <Grid md={6}>
                    <strong>
                        Total Revenue Range:
                    </strong>
                    <TextField
                        label=""
                        value={this.state.totalRevenueRange[0]}
                        onChange={this.handleTotalRevenueRange('start')}
                        margin="normal"
                    />
                    <strong>
                        to
                    </strong>
                    <TextField
                        label=""
                        value={this.state.totalRevenueRange[1]}
                        onChange={this.handleTotalRevenueRange('end')}
                        margin="normal"
                    />
                </Grid>
                <Grid item md={6}>
                    <Button variant="contained" onClick={this.reset}>
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" onClick={this.filter}>
                        Filter
                    </Button>
                </Grid>
                <Grid item md={6}>
                    <Button variant="contained" color="primary" onClick={this.detail}>
                        Daily Detail
                    </Button>
                </Grid>

                <Grid md={12}>
                    <Paper>
                        <Table className={'event-table'}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Select</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Event Count</TableCell>
                                    <TableCell>Staff Count</TableCell>
                                    <TableCell>Total Visits</TableCell>
                                    <TableCell>Total Revenue ($)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    this.state.filtered.map((detail, indx) => (
                                            <TableRow key={indx}>
                                                <TableCell>
                                                    <Radio checked={this.state[detail.date]} value={indx}
                                                           onChange={this.handleSelectedDetail} color={"primary"}/>
                                                </TableCell>
                                                <TableCell> {detail.date} </TableCell>
                                                <TableCell> {detail.event_count.length} </TableCell>
                                                <TableCell> {detail.staff_count.length} </TableCell>
                                                <TableCell> {detail.visits} </TableCell>
                                                <TableCell> {detail.revenue} </TableCell>
                                            </TableRow>
                                        )
                                    )
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid md={12}>
                    <Button item variant="contained" color="primary" onClick={this.back}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    reset = (event) => {
        this.state.filtered = this.state.detail;
        this.setState(this.state);
    }

    filter = (event) => {
        let filtered_vals = [];
        let tmp = undefined;
        this.state.detail.forEach(d => {
            const date = d.date;
            const eCount = d.event_count.length;
            const staffCount = d.staff_count.length;
            const visitCount = d.visits;
            const revenue = d.revenue;
            let tmp = d;
            if (this.state.eventCountRange[0] && this.state.eventCountRange[1]) {
                if (eCount < this.state.eventCountRange[0] || eCount > this.state.eventCountRange[1]) {
                    tmp = undefined;
                }
            }
            if (this.state.staffCountRange[0] && this.state.staffCountRange[1]) {
                if (staffCount < this.state.staffCountRange[0] || staffCount > this.state.staffCountRange[1]) {
                    tmp = undefined;
                }
            }
            if (this.state.totalVisitsRange[0] && this.state.totalVisitsRange[1]) {
                if (visitCount < this.state.totalVisitsRange[0] || visitCount > this.state.totalVisitsRange[1]) {
                    tmp = undefined;
                }
            }
            if (this.state.totalRevenueRange[0] && this.state.totalRevenueRange[1]) {
                if (revenue < this.state.totalRevenueRange[0] || revenue > this.state.totalRevenueRange[1]) {
                    tmp = undefined;
                }
            }
            if (tmp) {
                filtered_vals.push(tmp);
            }
        });
        this.state.filtered = filtered_vals;
        this.setState(this.state);
    }

    detail = (event) => {
    }

    back = (event) => {
    }

    handleStaffCountRange = (type) => event => {
        if (type === 'start') {
            this.state.staffCountRange[0] = event.target.value;
        } else if (type == 'end') {
            this.state.staffCountRange[1] = event.target.value;
        }
        this.setState(this.state);
    }

    handleEventCountRange = (type) => event => {
        if (type === 'start') {
            this.state.eventCountRange[0] = event.target.value;
        } else if (type == 'end') {
            this.state.eventCountRange[1] = event.target.value;
        }
        this.setState(this.state);
    }

    handleTotalVisitRange = (type) => event => {
        if (type === 'start') {
            this.state.totalVisitsRange[0] = event.target.value;
        } else if (type == 'end') {
            this.state.totalVisitsRange[1] = event.target.value;
        }
        this.setState(this.state);
    }

    handleTotalRevenueRange = (type) => event => {
        if (type === 'start') {
            this.state.totalRevenueRange[0] = event.target.value;
        } else if (type == 'end') {
            this.state.totalRevenueRange[1] = event.target.value;
        }
        this.setState(this.state);
    }

    handleSelectedDetail = (e) => {
        console.log('Radio: ');
        console.log(this.state.detail[e.target.value]);
        this.state.selectedDetail = this.state.detail[e.target.value];
        let e_date = this.state.selectedDetail.date;
        this.state.detail.forEach(d => {
            this.state[d.date] = false;
        });
        this.state[e_date] = true;
        console.log(this.state);
        this.setState(this.state);
    }
}
