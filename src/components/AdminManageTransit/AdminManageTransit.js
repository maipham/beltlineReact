import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import {Transit} from "../../entities/Transit";

const type = ['ALL', 'MARTA', 'Bus', 'Bike'];
const site_names = ['ALL','Piedmont Park', 'Atlanta Park', 'Atlanta Beltline Center', 'Historic Fourth Ward Park', 'Westview Cementary', 'Inman Park'];
const initial_transits = [new Transit("816", "Bus", "2.5", "4"),
    new Transit("200", "Bike", "2.5", "4"),
    new Transit("200", "MARTA", "4.5", "10"),
    new Transit("Blue", "Bus", "5", "12")];

export class AdminManageTransit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transportFilter: 'ALL',
            routeFilter: '',
            transits: initial_transits,
            siteFilter: 'ALL',
            priceLow: '',
            priceHigh: '',
            anchorEl: null,
            anchorEl2: null,
            selected: null,
        }
    }

    handleTransportClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleTransportOptionClick = event => {
        this.setState({
            anchorEl: null,
            transportFilter: event.target.innerText
        });
    };

    handleClose = (event, value) => {
        this.setState({ anchorEl: null,
            anchorEl2: null});
    };

    handleRouteChange = (event) => {
        this.setState({
            routeFilter: event.target.value
        });
    };

    handleSiteClick = event => {
        this.setState({ anchorEl2: event.currentTarget });
    };

    handleSiteOptionClick = event => {
        this.setState({
            anchorEl2: null,
            siteFilter: event.target.innerText
        })
    };

    handleMinPrice = event => {
        const onlyNum = event.target.value.replace(/[^0-9]/g, '');
        this.setState({
            priceLow: onlyNum
        })
    };

    handleMaxPrice = event => {
        const onlyNum = event.target.value.replace(/[^0-9]/g, '');
        this.setState({
            priceHigh: onlyNum
        })
    };

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    render() {
        const {anchorEl, anchorEl2} = this.state;
        return (
            <div>
                {/*container for the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Manage Transit</h1>
                    </Grid>
                </Grid>

                {/*container for transport type and route fields*/}
                <Grid container justify="center">
                    <Grid item style = {{marginRight: '200px'}}>
                        <InputLabel>Transport Type</InputLabel>
                        <Button aria-owns={anchorEl ? 'transport_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleTransportClick}> {this.state.transportFilter} </Button>
                        <Menu
                            id="transport_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {type.map((transports, index) =>
                                <MenuItem key={index}onClick={this.handleTransportOptionClick} value={transports}>{transports}</MenuItem>)}
                        </Menu>
                    </Grid>
                    <Grid item>
                        <InputLabel style={{marginRight: '10px'}}>Route</InputLabel>
                        <TextField onChange={this.handleRouteChange}/>
                    </Grid>
                </Grid>

                {/*Container for site and price range field*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item style={{marginRight: '165px'}}>
                        <InputLabel>Contain Site</InputLabel>
                        <Button aria-owns={anchorEl2 ? 'site_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSiteClick}> {this.state.siteFilter} </Button>
                        <Menu
                            id="site_menu"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
                            onClose={this.handleClose}
                        >
                            {site_names.map( (sites, index) =>
                                <MenuItem key={index} onClick={this.handleSiteOptionClick} value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>

                    <Grid item style={{marginRight: '20px'}}>
                        <InputLabel style={{marginRight: '40px'}}>Price Range</InputLabel>
                        <TextField label="min" onChange={this.handleMinPrice} style={{width: '40px'}}/>
                    </Grid>
                    <Grid item>
                        <TextField label="max" onChange={this.handleMaxPrice} style={{width: '40px'}}/>
                    </Grid>
                </Grid>

                {/*Container for the buttons*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item style={{marginRight: '80px'}}>
                       <Button variant="contained" color="primary">Filter</Button>
                    </Grid>
                    <Grid item style={{marginRight: '10px', marginLeft: '40px'}}>
                        <Button variant="contained" color="primary">Create</Button>
                    </Grid>
                    <Grid item style={{marginRight: '10px'}}>
                        <Button variant="contained" color="primary">Edit</Button>
                    </Grid>
                    <Grid item style={{marginRight: '10px'}}>
                        <Button variant="contained" color="primary">Delete</Button>
                    </Grid>
                </Grid>

                {/*container for the table of stuff*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Route</TableCell>
                                    <TableCell align="right">Transport Type</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right"># of Connected Sites</TableCell>
                                    <TableCell align="right"># of Transits Logged</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.transits.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow hover
                                                      aria-checked={!(() => this.isSelected(i))}
                                                      selected={isSelected}
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{transit.route}</TableCell>
                                        <TableCell align="right">{transit.transport_type}</TableCell>
                                        <TableCell align="right">{transit.price}</TableCell>
                                        <TableCell align="right">{transit.connected_sites}</TableCell>
                                        <TableCell align="right">5</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '20px'}} >
                    <Grid item>
                        <Button color="primary" variant="contained" style={{width: "80px"}}>Back</Button>
                    </Grid>
                </Grid>

            </div>
        )
    }
}