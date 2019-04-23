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
            listOfSites: [{eventName: 'Arborelum Walking Tour', staffName: 'Jason Lee', visit: 20, revenue: 0},
                {eventName: 'Bus Tour', staffName: 'Catherine White', visit: 80, revenue: 2000},
                {eventName: 'Eastside Trailr', staffName: 'Alice Smith', visit: 68, revenue: 0},
                {eventName: 'Private Bus Tour', staffName: 'Elizabeth Jones', visit: 32, revenue: 1280}]
        }
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

            }
        };
        hr.send();
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
                            {this.state.listOfSites.map((transit, i) => {
                                return (<TableRow hover
                                                  key={i}>
                                    <TableCell align="right">{transit.eventName}</TableCell>
                                    <TableCell align="right">{transit.staffName}</TableCell>
                                    <TableCell align="right">{transit.visit}</TableCell>
                                    <TableCell align="right">{transit.revenue}</TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Table>
                </Grid>

            </div>
        )
    }
}