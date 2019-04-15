import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';


let id = 0;
function createTransit(route, transport_type, price, num_connected_sites) {
    id += 1;
    return {id, route, transport_type, price, num_connected_sites};
}

const initialTransit = [createTransit("816", "Bus", "2.5", "4"),
                        createTransit("200", "MARTA", "2.5", "4"),
                        createTransit("319", "MARTA", "2.5", "4")]
export class User_take_transit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sitefilter: '',
            transportfilter: '',
            pricelow: '',
            pricehigh: ''  
        }
    }

    render() {
        return (
            <div>
                <h1>Take Transit</h1>
                <InputLabel>Contain Site</InputLabel>
                
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
                        {initialTransit.map(transit => (
                            <TableRow key={transit.id}>
                                <TableCell align="right">{transit.route}</TableCell>
                                <TableCell align="right">{transit.transport_type}</TableCell>
                                <TableCell align="right">{transit.price}</TableCell>
                                <TableCell align="right">{transit.num_connected_sites}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </div>
        );
    }

}