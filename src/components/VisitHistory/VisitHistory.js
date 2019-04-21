import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {TransitHistoryObject} from "../../entities/TransitHistoryObject";


const allTransportTypes = ['ALL'];
const site_names = ['ALL','Piedmont Park', 'Atlanta Park', 'Atlanta Beltline Center', 'Historic Fourth Ward Park', 'Westview Cementary', 'Inman Park'];
const testingHistory = [new TransitHistoryObject("2019-02-01", 816, "Bus", 2.5),
    new TransitHistoryObject("2019-02-03", "Red", "Bus", 3.5),
    new TransitHistoryObject("2019-02-09", "Blue", "Bike", 4.5)];

export class VisitHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            site: 'ALL',
            route: '',
            startDate: '',
            endDate: '',
            anchorEl: null,
            historyObjects: testingHistory,
            filteredHistory: testingHistory
        };
    }

    handleSiteClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSiteOptionClick = event => {
        this.setState({
            anchorEl: null,
            site: event.target.innerText
        })
    };

    handleClose = (event, value) => {
        this.setState({ anchorEl: null});
    };

    handleStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }

    handleStartDate = (event) => {
        this.setState({endDate: event.target.value});
    }

    handleEventChange = (event) => {
        this.setState({eventName: event.target.value});
        console.log("Changed event name");
    }

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                {/*container for the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Visit History</h1>
                    </Grid>
                </Grid>

                {/*container for the two button drop downs, transport type and contains site*/}
                <Grid container justify="center">
                    <Grid item style={{marginRight: '65px'}}>
                        <Grid item>
                            <InputLabel style={{marginRight: '10px'}}>Event</InputLabel>
                            <Input style={{width: '100px'}} onChange = {this.handleEventChange}/>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <InputLabel>Site</InputLabel>
                        <Button aria-owns={anchorEl ? 'site_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSiteClick}> {this.state.site} </Button>
                        <Menu
                            id="site_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {site_names.map( (sites, index) =>
                                <MenuItem key={index} onClick={this.handleSiteOptionClick} value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>

                    {/*container for Route, Start Date, and End Date*/}
                    <Grid container justify="center" spacing={40} style={{marginTop: '5px'}}>
                        <Grid item>
                            <InputLabel style={{paddingRight: '10px', marginTop: '50px'}}>Start Date</InputLabel>
                            <TextField id="startdate"
                                       type="date"
                                       defaultValue="01/01/2019"
                                       InputLabelProps={{shrink: true}}
                                       style={{width: '145px'}} onChange={this.handleStartDate}/>
                        </Grid>

                        <Grid item>
                            <InputLabel style={{paddingRight: '10px', marginTop: '50px'}}>End Date</InputLabel>
                            <TextField id="enddate" type="date" defaultValue="12/31/2019" InputLabelProps={{shrink: true}} style={{width: '145px'}}/>
                        </Grid>

                    </Grid>

                    {/*container for the Filter Button*/}
                    <Grid container justify="center" style={{marginTop: '25px'}}>
                        <Grid item>
                            <Button color='primary' variant='contained'>Filter</Button>
                        </Grid>

                    </Grid>

                    {/*container for the table to display data*/}
                    <Grid container justify="center" style={{marginTop: '20px'}}>
                        <Grid item>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Route</TableCell>
                                        <TableCell align="right">Transport Type</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.filteredHistory.map((transit, i) => {
                                        return (<TableRow hover
                                                          key={i}>
                                            <TableCell align="right">{transit.date}</TableCell>
                                            <TableCell align="right">{transit.route}</TableCell>
                                            <TableCell align="right">{transit.transport_type}</TableCell>
                                            <TableCell align="right">{transit.price}</TableCell>
                                        </TableRow>);
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Button variant="contained" color='primary' style={{marginTop: '10px'}}>Back</Button>
                    </Grid>

                </Grid>
            </div>
        )
    }
}