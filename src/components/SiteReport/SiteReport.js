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
import Radio from "@material-ui/core/Radio";
import {Link} from "react-router-dom";

export default class SiteReport extends Component {
    hr = new XMLHttpRequest();
    hash = null;
    constructor(props) {
        super(props);
        this.init();
        this.hash = props.location.hash;
    };

    init() {
        this.state = {
            dateRange: ['2019-02-01', '2019-03-01'],
            eventCountRange: ['', ''],
            staffCountRange: ['', ''],
            totalVisitsRange: ['', ''],
            totalRevenueRange: ['', ''],
            selectedDetail: '',
            selectedDetailIndx: '',
            detail: mock_daily_events,
            filtered: [],
            chosenDate: ''
        };
        mock_daily_events.forEach(e => {
            this.state[e.date] = false;
        });
    }

    componentDidMount() {
        this.hash = this.props.location.hash.substring(1);
        this.hr.open('GET',
        'http://localhost:5000/m_site_report?username=' + this.hash
        + '&start_date=' + this.state.dateRange[0] + '&end_date=' + this.state.dateRange[1]);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                console.log(data);
                this.state.filtered = data;
                this.setState(this.state);
            }
        };
        this.hr.send();
    }

    render() {
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Site Report</h1></Grid>
                <Grid container spacing={24} justify="center">
                    <Grid container justify="center" item xs={6}>
                        <form noValidate>
                            <TextField
                                label="Start Date"
                                type="date"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                value={this.state.dateRange[0]}
                                className={'start-date'}
                                onChange={this.handleDateRange('start')}
                            />
                        </form>
                    </Grid>
                    <Grid container justify="center" item xs={6}>
                        <form noValidate>
                            <TextField
                                label="End Date"
                                type="date"
                                defaultValue={moment().format('YYYY-MM-DD')}
                                value={this.state.dateRange[1]}
                                onChange={this.handleDateRange('end')}
                                className={'end-date'}
                            />
                        </form>
                    </Grid>
                    <Grid container justify="center" item xs={6}>
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
                    <Grid container justify="center" item xs={6}>
                        <strong>
                            Staff Count Range:
                        </strong>
                        <TextField
                            label=""
                            value={this.state.staffCountRange[0]}
                            onChange={this.handleStaffCountRange('start')}
                        />
                        <strong>
                            to
                        </strong>
                        <TextField
                            label=""
                            value={this.state.staffCountRange[1]}
                            onChange={this.handleStaffCountRange('end')}
                        />
                    </Grid>
                    <Grid container justify="center" item xs={6}>
                        <strong>
                            Total Visits Range:
                        </strong>
                        <TextField
                            label=""
                            value={this.state.totalVisitsRange[0]}
                            onChange={this.handleTotalVisitRange('start')}
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
                    <Grid container justify="center" item xs={6}>
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
                        />
                    </Grid>
                    <Grid container justify="center" item xs={6}>
                        <Button variant="contained" onClick={this.reset}>
                            Reset
                        </Button>
                        <Button variant="contained" color="primary" onClick={this.filter}>
                            Filter
                        </Button>
                    </Grid>
                    <Grid container justify="center" item xs={6}>
                        {/*<Button variant="contained" color="primary" onClick={this.detail}>*/}
                            {/*Daily Detail*/}
                        {/*</Button>*/}
                        <Button variant="contained"  component={Link} color="primary"
                                to={{
                                    pathname: '/daily_detail',
                                    hash: this.hash,
                                    state: {
                                        date: this.state.chosenDate
                                    }
                                }}>Daily Detail</Button>
                    </Grid>

                    <Grid container justify="center" item xs={12}>
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
                                                    <TableCell> {detail.event_count} </TableCell>
                                                    <TableCell> {detail.staff_count} </TableCell>
                                                    <TableCell> {detail.total_visits} </TableCell>
                                                    <TableCell> {detail.total_revenue} </TableCell>
                                                </TableRow>
                                            )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                    <Grid container justify="center" item xs={12}>
                        <Button item variant="contained" color="primary" onClick={this.back}>
                            Back
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

    reset = (event) => {
        this.state.filtered = this.state.detail;
        this.setState(this.state);
    }

    filter = (event) => {
        // this.hash = this.props.location.hash.substring(1);
        // this.hr.open('GET',
        //     'http://localhost:5000/m_site_report?username=' + this.hash
        //     + '&start_date=' + this.state.dateRange[0] + '&end_date=' + this.state.dateRange[1]);
        // this.hr.onreadystatechange = (event) => {
        //     if (event.target.readyState === 4 && event.target.status === 200) {
        //         const data = JSON.parse(event.target.responseText);
        //         console.log(data);
        //     }
        // };
        // this.hr.send();
        let filtered_vals = [];
        let tmp = undefined;
        this.state.detail.forEach(d => {
            const date = d.date;
            const eCount = d.event_count.length;
            const staffCount = d.staff_count.length;
            const visitCount = d.visits;
            const revenue = d.revenue;
            let tmp = d;
            if (this.state.dateRange[0] && this.state.dateRange[1]) {
                const sel = moment(date).valueOf();
                const start = moment(this.state.dateRange[0]).valueOf();
                const end = moment(this.state.dateRange[1]).valueOf();
                if (sel < start || sel > end) {
                    tmp = undefined;
                }
            }
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
        } else if (type === 'end') {
            this.state.staffCountRange[1] = event.target.value;
        }
        this.setState(this.state);
    }

    handleEventCountRange = (type) => event => {
        if (type === 'start') {
            this.state.eventCountRange[0] = event.target.value;
        } else if (type === 'end') {
            this.state.eventCountRange[1] = event.target.value;
        }
        this.setState(this.state);
    }

    handleTotalVisitRange = (type) => event => {
        if (type === 'start') {
            this.state.totalVisitsRange[0] = event.target.value;
        } else if (type === 'end') {
            this.state.totalVisitsRange[1] = event.target.value;
        }
        this.setState(this.state);
    }

    handleTotalRevenueRange = (type) => event => {
        if (type === 'start') {
            this.state.totalRevenueRange[0] = event.target.value;
        } else if (type === 'end') {
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
        this.state.chosenDate = this.state.selectedDetail._date;
        this.setState(this.state);
        console.log(this.state.chosenDate);
    }

    handleDateRange = (type) => event => {
        if (type === 'start') {
            this.state.dateRange[0] = event.target.value;
        } else if (type == 'end') {
            this.state.dateRange[1] = event.target.value;
        }
        this.setState(this.state);
    }
}
