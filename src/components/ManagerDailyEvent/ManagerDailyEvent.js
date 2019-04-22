import React, {Component} from 'react';
import './ManagerDailyEvent.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {mock_daily_events} from "../../mocks/daily-details-mock";
import Grid from "@material-ui/core/Grid";

export default class ManagerDailyEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: mock_daily_events
        };
    };

    render() {
        return (
            <Grid container>
                <h1>Manager Daily Detail</h1>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Event Name</TableCell>
                            <TableCell align="center">Staff Names</TableCell>
                            <TableCell align="center">Visits</TableCell>
                            <TableCell align="center">Revenue ($)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.details.map((detail, i) => {
                            return (<TableRow hover
                                              key={i}>
                                <TableCell align="center">{detail.eventname}</TableCell>
                                <TableCell align="center">
                                    {
                                        detail.staffs.map((staff) => (
                                            <p> {staff.name} </p>

                                        ))
                                    }
                                </TableCell>
                                <TableCell align="center">{detail.visits}</TableCell>
                                <TableCell align="center">{detail.revenue}</TableCell>
                            </TableRow>);
                        })}
                    </TableBody>
                </Table>
            </Grid>
        );
    }
}
