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

const API = 'http://localhost:8080';
const query = '/transit';

const site_names = ['ALL','Piedmont Park', 'Atlanta Park', 'Atlanta Beltline Center', 'Historic Fourth Ward Park', 'Westview Cementary', 'Inman Park'];
const type = ['ALL', 'MARTA', 'Bus', 'Bike'];

const initial_transits = [new Transit("816", "Bus", "2.5", "4"),
    new Transit("200", "Bike", "2.5", "4"),
    new Transit("200", "MARTA", "4.5", "10"),
    new Transit("Blue", "Bus", "5", "12")];

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yyyy = today.getFullYear();

today = mm + '-' + dd + '-' + yyyy;


export class User_take_transit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            transits: initial_transits,
            sitefilter: 'ALL',
            transportfilter: 'ALL',
            pricelow: 0,
            pricehigh: 0,
            anchorEl: null,
            anchorEl2: null,
            selected: null
        }

    }

    componentDidMount() {
        fetch(API + query).then(response => response.json()).then(data => {this.setState({transits: data});
            console.log(data)});
    }

    handleSiteClick = event => {
        console.log(today);
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSiteOptionClick = event => {
        this.setState({
            anchorEl: null,
            sitefilter: event.target.innerText
        })
    };

    handleMinPrice = event => {
        const onlyNum = event.target.value.replace(/[^0-9]/g, '');
        this.setState({
            pricelow: onlyNum
        })
    };

    handleMaxPrice = event => {
        const onlyNum = event.target.value.replace(/[^0-9]/g, '');
        this.setState({
            pricehigh: onlyNum
        })
    };

    handleTransportClick = event => {
        this.setState({anchorEl2: event.currentTarget});
    };

    handleTransportOptionClick = event => {
        this.setState({
            anchorEl2: null,
            transportfilter: event.target.innerText
        });
    };

    handleClose = (event, value) => {
        this.setState({ anchorEl: null,
                        anchorEl2: null});
    };

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    handleFilter = () => {
        const siteFilter = this.state.sitefilter;
        const transportFilter = this.state.transportfilter;
        const priceLow = this.state.pricelow;
        const priceHigh = this.state.pricehigh;
        let newTransits = initial_transits;

        if (siteFilter === 'ALL'
            && transportFilter === 'ALL'
            && (priceLow === 0 || priceLow === '0' || priceLow === '')
            && (priceLow === 0 || priceHigh === '0' || priceHigh === '')) {
            this.setState({
                transits: initial_transits
            });
        } else {
            if (transportFilter !== 'ALL') {
                newTransits = newTransits.filter(transit => transit.type === transportFilter);
            }
            if (parseInt(priceLow, 10) > 0 && (priceHigh === '' || parseInt(priceHigh, 10) === 0) ) {
                newTransits = newTransits.filter(transit => parseInt(transit.price, 10) >= parseInt(priceLow, 10));
            } else if (parseInt(priceHigh, 10) >= 0 && (priceLow === '' || parseInt(priceLow, 10) === 0)){
                newTransits = newTransits.filter(transit => parseInt(transit.price, 10) <= parseInt(priceHigh, 10));
            } else {
                newTransits = newTransits.filter(transit => parseInt(transit.price, 10) >= parseInt(priceLow, 10));
                newTransits = newTransits.filter(transit => parseInt(transit.price, 10) <= parseInt(priceHigh, 10));
            }
            this.setState({
                transits: newTransits
            });
        }
    }

    isSelected = id => id === this.state.selected;


    render() {
        const { anchorEl } = this.state;
        const { anchorEl2 } = this.state;
        return (
            <div>
                {/*grid container of the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Take Transit</h1>
                    </Grid>
                </Grid>

                {/*grid container of the transport type dropdown and also contain site dropdown*/}
                <Grid container spacing={40} justify="center">
                    <Grid item>
                        <InputLabel>Contain Site</InputLabel>
                        <Button aria-owns={anchorEl ? 'site_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSiteClick}> {this.state.sitefilter} </Button>
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
                    <Grid item>
                        <InputLabel>Transport Type</InputLabel>
                        <Button aria-owns={anchorEl2 ? 'transport_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleTransportClick}> {this.state.transportfilter} </Button>
                        <Menu
                            id="transport_menu"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
                            onClose={this.handleClose}
                        >
                            {type.map((transports, index) =>
                                <MenuItem key={index}onClick={this.handleTransportOptionClick} value={transports}>{transports}</MenuItem>)}
                        </Menu>
                    </Grid>
                </Grid>

                {/*grid container that has price range and filter button*/}
                <Grid container spacing={0} justify="center">
                    <Grid item container justify="center" xs={1}>
                        <TextField label="min" onChange={this.handleMinPrice} style={{width: '40px'}}/>
                    </Grid>

                    <Grid item container justify="center" xs={1}>
                        <TextField label="max" onChange={this.handleMaxPrice} style={{width: '40px'}}/>
                    </Grid>
                    <Grid item container justify="center" xs={2}>
                        <Button variant="contained" color="primary" onClick={this.handleFilter}>Filter</Button>
                    </Grid>
                </Grid>

                {/*grid container of the table*/}
                <Grid container justify="center">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Route</TableCell>
                                <TableCell align="right">Transport Type</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right"># of Connected Sites</TableCell>
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
                                    <TableCell align="right">{transit.type}</TableCell>
                                    <TableCell align="right">{transit.price}</TableCell>
                                    <TableCell align="right">{transit.connected_sites}</TableCell>
                                </TableRow>);
                            })}

                        </TableBody>
                    </Table>
                </Grid>

                {/*grid container of back button, transition date, and log transit*/}
                <Grid container justify="space-around">
                    <Grid item>
                        <Button variant="contained" color="primary" style={{marginTop: '10px'}}>Back</Button>
                    </Grid>

                    <Grid item>
                        <TextField label="Date" defaultValue={today} InputProps={{readOnly: true}}
                                   style={{ width: '88px'}}/>
                    </Grid>

                    <Grid item>
                        <Button variant="contained" color="primary" style={{marginTop: '10px'}}>Log Transit</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

}