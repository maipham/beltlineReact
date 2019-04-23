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
import {Link} from "react-router-dom";
import {response_messages} from "../../entities/constants";

const type = ['MARTA', 'Bus', 'Bike'];

export class AdminEditTransit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            transportType: props.location.state.type,
            route: props.location.state.route,
            price: props.location.state.price,
            site_names: props.location.state.sites,
            connectedIndexes: [],
            anchorEl: null
        }
    }

    componentDidMount() {
        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/a_edit_transit?';
        const type = 'type=' + this.state.transportType;
        const route = 'route=' + this.state.route;
        hr.open('GET', url + type + '&' + route);
        hr.onreadystatechange = (e) => {
            // console.log(e);
            if (e.target.readyState === 4 && e.target.status === 200) {
                const response = JSON.parse(e.target.responseText);
                console.log(response);
                let indexes = [];
                let sites = this.state.site_names;
                response[0].connected_sites.forEach(function(element) {
                    indexes.push(sites.indexOf(element));
                });
                console.log(indexes);
                this.setState({
                    connectedIndexes: indexes
                })
                console.log(this.state.connectedIndexes)
            }
        };
        hr.send();
    }

    handleTransportClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleTransportOptionClick = event => {
        this.setState({
            anchorEl: null,
            transportType: event.target.innerText
        });
    };

    handleClose = (event, value) => {
        this.setState({ anchorEl: null});
    };

    handleRouteChange = (event) => {
        this.setState({
            route: event.target.value
        });
    };

    isSelected = id => this.state.connectedIndexes.includes(id);

    handleRowClick = (event, i) => {
        let newClicked = this.state.connectedIndexes;
        if (newClicked.includes(i)) {
            let index = newClicked.indexOf(i);
            if (index !== -1) {
                newClicked.splice(index, 1);
                this.setState({
                    connectedIndexes: newClicked
                });
            }
        } else {
            newClicked.push(i);
            this.state.connectedIndexes = newClicked;
            this.setState(this.state);
        }
    };

    handlePriceChange = (event) => {
        this.setState({
            price: event.target.value
        });
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                {/*container for the header*/}
                <Grid container justify="center">
                    <h1>Edit Transit</h1>
                </Grid>

                {/*container for the transport type, route, and price text fields*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item style={{marginRight: '40px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Transport Type</InputLabel>
                        <Button aria-owns={anchorEl ? 'site_menu' : undefined}
                                disabled={true}
                                aria-haspopup="true"
                                onClick={this.handleTransportClick}> {this.state.transportType} </Button>
                        <Menu
                            id="site_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {type.map( (transports, index) =>
                                <MenuItem key={index} onClick={this.handleTransportOptionClick} value={transports}>{transports}</MenuItem>)}
                        </Menu>
                    </Grid>

                    <Grid item style={{marginRight: '40px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Route</InputLabel>
                        <TextField style={{width: '120px'}} defaultValue={this.state.route} onChange={this.handleRouteChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '10px'}}>Price($)</InputLabel>
                        <TextField style={{width: '40px'}} defaultValue={this.state.price} onChange={this.handlePriceChange}/>
                    </Grid>
                </Grid>

                {/*container for the table of available sites*/}
                <Grid container justify='center' style={{marginTop: '20px'}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Connected Sites</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.site_names.map((site, i) => {
                                const isSelected = this.isSelected(i);
                                return (<TableRow hover
                                                  aria-checked={!(() => this.isSelected(i))}
                                                  selected={isSelected}
                                                  key={i}
                                                  onClick={event => this.handleRowClick(event, i)}>
                                    <TableCell align="center">{site}</TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Table>
                </Grid>

                {/*container for the back and create buttons*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item>
                        <Button component={Link} to={'/manage_transit'} variant="contained" color="primary" style={{marginRight: '100px', width: "120px"}}>Back</Button>
                    </Grid>

                    <Grid item>
                        <Button disabled={!(this.state.route && this.state.price && this.state.connectedIndexes.length >= 2)}
                                style={{width: "120px"}} variant="contained" color="primary">Update</Button>
                    </Grid>

                </Grid>

            </div>
        )
    }
}