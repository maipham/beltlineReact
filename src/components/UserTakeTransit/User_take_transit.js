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


let id = 0;
function createTransit(route, transport_type, price, num_connected_sites) {
    id += 1;
    return { id, route, transport_type, price, num_connected_sites };
}
const site_names = ['ALL','Piedmont Park', 'Atlanta Park', 'Atlanta Beltline Center', 'Historic Fourth Ward Park', 'Westview Cementary', 'Inman Park'];

const initial_transits = [createTransit("816", "Bus", "2.5", "4"),
    createTransit("200", "MARTA", "2.5", "4"),
    createTransit("319", "MARTA", "2.5", "4")];

const transport_type = ['ALL', 'MARTA', 'Bus', 'Bike'];

export class User_take_transit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sitefilter: 'All',
            transportfilter: 'All',
            pricelow: '',
            pricehigh: '',
            anchorEl: null,
            anchorEl2: null
        }
    }
    handleSiteClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSiteOptionClick = event => {
        this.setState({
            anchorEl: null,
            sitefilter: event.target.innerText
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


    render() {
        const { anchorEl } = this.state;
        const { anchorEl2 } = this.state;
        return (
            <div>
                <h1>Take Transit</h1>
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
                    {site_names.map(sites =>
                        <MenuItem onClick={this.handleSiteOptionClick} value={sites}>{sites}</MenuItem>)}
                </Menu>
                
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
                    {transport_type.map(transports => 
                        <MenuItem onClick={this.handleTransportOptionClick} value={transports}>{transports}</MenuItem>)}
                </Menu>
                <Button>Filter</Button>
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
                        {initial_transits.map(transit => (
                            <TableRow key={transit.id}>
                                <TableCell align="right">{transit.route}</TableCell>
                                <TableCell align="right">{transit.transport_type}</TableCell>
                                <TableCell align="right">{transit.price}</TableCell>
                                <TableCell align="right">{transit.num_connected_sites}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                <Button>Back</Button>
                <Input placeholder="date"></Input>
                <Button>Log Transit</Button>
            </div>
        );
    }

}