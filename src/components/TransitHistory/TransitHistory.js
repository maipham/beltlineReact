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


const allTransportTypes = ['ALL', 'MARTA', 'Bus', 'Bike'];

export class TransitHistory extends Component {
    hr = new XMLHttpRequest();
    url = 'http://localhost:5000/transit_history?';
    constructor(props) {
        super(props);
        this.state = {
            transportType: 'ALL',
            containSite: 'ALL',
            route: '',
            startDate: '',
            endDate: '',
            anchorEl: null,
            anchorEl2: null,
            historyObjects: [],
            filteredHistory: [],
            siteNames: []
        };
    }
    handleTransportClick = event => {
        this.setState({anchorEl2: event.currentTarget});
    };

    handleTransportOptionClick = event => {
        this.setState({
            anchorEl2: null,
            transportType: event.target.innerText
        });
    };

    handleSiteClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSiteOptionClick = event => {
        this.setState({
            anchorEl: null,
            containSite: event.target.innerText
        })
    };

    handleClose = (event, value) => {
        this.setState({ anchorEl: null,
            anchorEl2: null});
    };

    handleStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }

    handleStartDate = (event) => {
        this.setState({endDate: event.target.value});
    }

    componentDidMount() {
        const full = this.url + 'username=' + this.props.location.hash.substring(1);
        this.hr.open('GET', full);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                if (data.length > 0) {
                    let a = [];
                    data[1].forEach(function(element) {
                        a.push(element.name);
                    });

                    this.setState({
                        historyObjects: data[0],
                        filteredHistory: data[0],
                        siteNames: a
                    });
                }
            }
        };

        this.hr.send();
    }

    render() {
        const {anchorEl, anchorEl2} = this.state;
        return (
            <div>
                {/*container for the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Transit History</h1>
                    </Grid>
                </Grid>

                {/*container for the two button drop downs, transport type and contains site*/}
                <Grid container justify="center">
                    <Grid item style={{marginRight: '65px'}}>
                        <InputLabel>Transport Type</InputLabel>
                        <Button aria-owns={anchorEl2 ? 'transport_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleTransportClick}> {this.state.transportType} </Button>
                        <Menu
                            id="transport_menu"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
                            onClose={this.handleClose}
                        >
                            {allTransportTypes.map((transports, index) =>
                                <MenuItem key={index}onClick={this.handleTransportOptionClick} value={transports}>{transports}</MenuItem>)}
                        </Menu>
                    </Grid>

                    <Grid item>
                        <InputLabel>Contain Site</InputLabel>
                        <Button aria-owns={anchorEl ? 'site_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSiteClick}> {this.state.containSite} </Button>
                        <Menu
                            id="site_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {this.state.siteNames.map( (sites, index) =>
                                <MenuItem key={index} onClick={this.handleSiteOptionClick} value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>

                    {/*container for Route, Start Date, and End Date*/}
                    <Grid container justify="center" spacing={40} style={{marginTop: '5px'}}>
                        <Grid item>
                            <InputLabel style={{marginRight: '10px'}}>Route</InputLabel>
                            <Input style={{width: '60px'}}/>
                        </Grid>

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
                            <TextField id="enddate" type="date" defaultValue="12/01/2019" InputLabelProps={{shrink: true}} style={{width: '145px'}}/>
                        </Grid>

                    </Grid>

                    {/*container for the Filter Button*/}
                    <Grid container justify="center" style={{marginTop: '10px'}}>
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