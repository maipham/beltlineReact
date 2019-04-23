import Grid from "@material-ui/core/Grid";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React, { Component } from 'react';

export class ManagerDailyDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: []
        }
    }

    hr = new XMLHttpRequest();
    componentDidMount() {
        console.log(this.props.location);
        const username = this.props.location.hash.substring(1);
        const date = this.props.location.state.date;
        const url = 'http://localhost:5000/m_daily_detail?manager_username='
            + username
            + '&date=' + date;
        this.hr.open('GET', url);
        this.hr.onreadystatechange = (e) => {
            // console.log(e);
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat);
                this.state.details = ret_dat;
                this.setState(this.state);

            }
        };
        this.hr.send();
    }

    render() {
        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1>Daily Detail</h1>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Event Name</TableCell>
                                <TableCell align="right">Staff Name</TableCell>
                                <TableCell align="right">Visits</TableCell>
                                <TableCell align="right">Revenue ($)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.details.map((det, i) => {
                                return (<TableRow hover
                                                  key={i}>
                                    <TableCell align="right">{det.event_name}</TableCell>
                                    <TableCell align="right">
                                        {det.staff_names.map((name,i) => {
                                            return <div key={i}>{name}</div>
                                        })}
                                    </TableCell>
                                    <TableCell align="right">{det.visits}</TableCell>
                                    <TableCell align="right">{det.revenue}</TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Table>
                </Grid>

            </div>
        )
    }
}