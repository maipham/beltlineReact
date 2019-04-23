import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import React, {Component} from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {Transit} from "../../entities/Transit";

const tt_names = ['ALL', 'MARTA', 'Bike', 'Bus'];
const date = new Date().getDate();

export class TransitDetail extends Component {
    hr = new XMLHttpRequest();
    constructor(props) {
        super(props);
        this.state = {
            staff: [1, 2, 3, 4, 5],
            transits: [],
            selected: null,
            anchorEl: null,
            tt: 'ALL',
            transitDate: {date},
            username: ''
        }
    }

    componentDidMount() {
        const url = 'http://localhost:5000/v_transit_detail?';
        this.hr.open('GET', url + "site_name=" + this.props.location.state.site_name + "&type=" + this.state.tt);
        console.log(this.state);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                console.log(data);
                this.setState({
                    transits: data,
                    username: this.props.location.state.username
                });

            }
        };
        this.hr.send();
    }

    logTransit = (e) => {
        console.log(this.state)
        const body = {
            'username': this.state.username,
            'type': this.state.transits[0].type,
            'route': this.state.transits[0].route,
            'transit_date': this.state.transitDate
        };
        this.hr.open('POST', 'http://localhost:5000/v_transit_detail');
        this.hr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                console.log('log sucess');
            }
        };
        this.hr.send(JSON.stringify(body));
    }

    handleTransitDate = (event) => {
        this.setState({transitDate: event.target.value});
        console.log("Changed the date!")
    }

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    handleTTClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleTTOptionClick = event => {
        this.setState({
            anchorEl: null,
            tt: event.target.innerText
        })
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1>Transit Detail</h1>
                    </Grid>
                </Grid>

                {/*container for the first name and the last name*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '35px'}}>
                        <InputLabel
                            style={{marginRight: '15px'}}>Site: {this.props.location.state.site_name}</InputLabel>
                    </Grid>

                    <Grid item>
                        <InputLabel>Transport Type</InputLabel>
                        <Button aria-owns={anchorEl ? 'tt_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleTTClick}> {this.state.tt} </Button>
                        <Menu
                            id="tt_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {tt_names.map((sites, index) =>
                                <MenuItem key={index} onClick={this.handleTTOptionClick}
                                          value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>
                </Grid>

                {/*container for the filter button*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '30px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Transit Date</InputLabel>
                        <TextField id="transitdate"
                                   type="date"
                                   defaultValue={date}
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleTransitDate}/>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained"
                                onClick={this.logTransit}
                        >Log Transit</Button>
                    </Grid>
                </Grid>

                {/*container for the table*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Route</TableCell>
                                    <TableCell align="right">Transport Type</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="right">No. of Connected Sites</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.transits.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow selected={isSelected}
                                                      hover
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
                </Grid>

                {/*container for the back button*/}
                <Grid style={{marginTop: '40px'}} container justify="center">
                    <Grid item>
                        <Button style={{width: '100px'}} color="primary" variant="contained">Back</Button>
                    </Grid>
                </Grid>

            </div>
        )
    }
}