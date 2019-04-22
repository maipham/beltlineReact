import React, {Component} from 'react';
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
import {ManageUser} from "../../entities/ManageUser";
import {ManageSiteObject} from "../../entities/ManageSiteObject";
import {Link} from "react-router-dom";

const openStatus = ['Yes', 'No', '--'];
const testManagers = ["ALL", "James Johnson", "Michael Smith", "Reece Gao", "Frank Zhou", "Mai Pham", "Alex McQuilken"]
const testSites = ['ALL', 'Piedmont Park', 'Atlanta Park', 'Atlanta Beltline Center', 'Historic Fourth Ward Park', 'Westview Cementary', 'Inman Park'];
const testManageSite = [new ManageSiteObject("Atlanta Beltline Center", "James Johnson", "Yes"),
    new ManageSiteObject("Gorden-White Park", "Michael Smith", "No"),
    new ManageSiteObject("Inman Park", "Frank Zhou", "Yes")];

export class ManageSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteFilter: 'ALL',
            managerFilter: 'ALL',
            openStatus: '--',
            anchorEl: null,
            anchorEl1: null,
            anchorEl2: null,
            selected: null,
            initialManageSite: testManageSite,
            filteredManageSite: testManageSite
        }
    }

    componentDidMount() {
        this._isMounted = true;

        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/a_manage_site';
        hr.open('GET', url);
        hr.onreadystatechange = (e) => {
            // console.log(e);
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat);
                this.setState({
                    initialManageSite: ret_dat,
                    filteredManageSite: ret_dat
                })
            }
        };
        hr.send();
    }

    handleOpenClick = event => {
        this.setState({anchorEl1: event.currentTarget})
    }

    handleOpenOptionClick = event => {
        this.setState({
            anchorEl1: null,
            openStatus: event.target.innerText
        })
    }

    handleManagerOptionClick = event => {
        this.setState({
            anchorEl: null,
            managerFilter: event.target.innerText
        });
    };
    handleManagerClick = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleSiteOptionClick = event => {
        this.setState({
            anchorEl2: null,
            siteFilter: event.target.innerText
        });
    };
    handleSiteClick = event => {
        this.setState({anchorEl2: event.currentTarget});
    };

    handleClose = (event, value) => {
        this.setState({
            anchorEl: null,
            anchorEl2: null,
            anchorEl1: null
        });
    };

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    isSelected = id => id === this.state.selected;

    render() {
        const {anchorEl2, anchorEl, anchorEl1} = this.state
        return (
            <div>
                {/*Container for holding the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Manage Site</h1>
                    </Grid>
                </Grid>

                {/*Container for holding the site and manager filter*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '65px'}}>
                        <InputLabel>Site</InputLabel>
                        <Button aria-owns={anchorEl2 ? 'site_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSiteClick}> {this.state.siteFilter}</Button>
                        <Menu
                            id="site_menu"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
                            onClose={this.handleClose}
                        >
                            {testSites.map((sites, index) =>
                                <MenuItem key={index} onClick={this.handleSiteOptionClick}
                                          value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>

                    <Grid item style={{marginLeft: '65px'}}>
                        <InputLabel>Manager</InputLabel>
                        <Button aria-owns={anchorEl ? 'manager_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleManagerClick}>{this.state.managerFilter}</Button>
                        <Menu
                            id="manager_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {testManagers.map((manager, index) =>
                                <MenuItem key={index} onClick={this.handleManagerOptionClick}
                                          value={manager}>{manager}</MenuItem>)}
                        </Menu>
                    </Grid>
                </Grid>

                {/*Container that holds the open everyday dropdown filter selection*/}
                <Grid container justify="center">
                    <Grid item>
                        <InputLabel>Open Everyday</InputLabel>
                        <Button aria-owns={anchorEl ? 'open_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleOpenClick}>{this.state.openStatus}</Button>
                        <Menu
                            id="open_menu"
                            anchorEl={anchorEl1}
                            open={Boolean(anchorEl1)}
                            onClose={this.handleClose}
                        >
                            {openStatus.map((status, index) =>
                                <MenuItem key={index} onClick={this.handleOpenOptionClick}
                                          value={status}>{status}</MenuItem>)}
                        </Menu>
                    </Grid>
                </Grid>

                {/*Container to hold all the buttons, including Filter, Create, Edit, and Delete*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '120px'}}>
                        <Button component={Link}  variant="contained" color="primary">Filter</Button>
                    </Grid>
                    <Grid item style={{marginRight: '20px'}}>
                        <Button component={Link} to={'/create_site'} variant="contained" color="primary">Create</Button>
                    </Grid>
                    <Grid item style={{marginRight: '20px'}}>
                        <Button component={Link} to={'/edit_site'} variant="contained" color="primary">Edit</Button>
                    </Grid>
                    <Grid item style={{marginRight: '20px'}}>
                        <Button variant="contained" color="primary">Delete</Button>
                    </Grid>
                </Grid>

                {/*Container to hold the table view of sites manager can manage*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Site Name</TableCell>
                                    <TableCell align="right">Manager</TableCell>
                                    <TableCell align="right">Open Everyday</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.filteredManageSite.map((site, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow hover
                                                      aria-checked={!(() => this.isSelected(i))}
                                                      selected={isSelected}
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{site.site_name}</TableCell>
                                        <TableCell align="right">{site.name}</TableCell>
                                        <TableCell align="right">{site.open_everyday}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                {/*Container that holds the back button*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item>
                        <Button color="primary" variant="contained">Back</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}