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

export default class SiteReport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventCountRange: ['', ''],
            staffCountRange: ['', ''],
            totalVisitsRange: ['', ''],
            totalRevenueRange: ['', ''],
        };
    };

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
                        margin="normal"
                    />
                    <strong>
                        to
                    </strong>
                    <TextField
                        label=""
                        value={this.state.totalRevenueRange[1]}
                        margin="normal"
                    />
                </Grid>
                <Grid item md={6} spacing={24}>
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
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
                <Grid container alignItems={'right'}>
                    <Button item variant="contained" color="primary" onClick={this.back}>
                        Back
                    </Button>
                </Grid>
            </Grid>
        );
    }

    reset = (event) => {
    }

    filter = (event) => {
    }

    detail = (event) => {
    }

    back = (event) => {
    }

    handleStaffCountRange = (type) => event => {
        if (type === 'start') {
        } else if (type == 'end') {
        }
    }

    handleEventCountRange = (type) => event => {
        if (type === 'start') {
        } else if (type == 'end') {
        }
    }

    handleTotalVisitRange = (type) => event => {
        if (type === 'start') {
        } else if (type == 'end') {
        }
    }
}
