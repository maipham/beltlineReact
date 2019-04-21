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
import {ManageUser} from "../../entities/ManageUser";

const userTypes = ["User", "Visitor", "Staff", "Manager"];
const status = ["Approved", "Pending", "Declined"];
const adminUser = "james.smith";

export class AdminManageUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterUser: '',
            filterType: 'Manager',
            filterStatus: 'ALL',
            anchorEl: null,
            anchorEl2: null,
            selected: null,
            initialUsers: [],
            filteredUsers: []
        }
    }

    handleStatusClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleStatusOptionClick = event => {
        this.setState({
            anchorEl: null,
            filterStatus: event.target.innerText
        })
    };

    handleTypeOptionClick = event => {
        this.setState({
            anchorEl2: null,
            filterType: event.target.innerText
        });
    };
    handleTypeClick = event => {
        this.setState({anchorEl2: event.currentTarget});
    };

    handleClose = (event, value) => {
        this.setState({ anchorEl: null,
            anchorEl2: null});
    };

    handleUserChange = (event) => {
        this.setState({
            filterUser: event.target.value
        })
    };

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    isSelected = id => id === this.state.selected;

    componentDidMount() {
        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/a_manage_user?';

        hr.open('GET', url + "username=" + adminUser);

        hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                this.setState({
                    initialUsers: data,
                    filteredUsers: data
                });
                console.log(data);

            }
        };

        hr.send();
    }

    render() {
        const {anchorEl, anchorEl2} = this.state;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1>Manage User</h1>
                    </Grid>
                </Grid>

                {/*container to hold the username, type, and status filter options*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item style={{marginRight: '150px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Username</InputLabel>
                        <TextField onChange={this.handleUserChange}/>
                    </Grid>

                    <Grid item style={{marginRight: '150px'}}>
                        <InputLabel>Type</InputLabel>
                        <Button aria-owns={anchorEl2 ? 'type_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleTypeClick}> {this.state.filterType}</Button>
                        <Menu
                            id="type_menu"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
                            onClose={this.handleClose}
                        >
                            {userTypes.map((type, index) =>
                                <MenuItem key={index} onClick={this.handleTypeOptionClick} value={type}>{type}</MenuItem>)}
                        </Menu>
                    </Grid>

                    <Grid item>
                        <InputLabel>Status</InputLabel>
                        <Button aria-owns={anchorEl ? 'status_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleStatusClick}>{this.state.filterStatus}</Button>
                        <Menu
                            id="status_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {status.map( (sites, index) =>
                                <MenuItem key={index} onClick={this.handleStatusOptionClick} value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>

                    {/*Container to hold all the buttons, including filter, approve, and decline*/}
                    <Grid container justify="center" style={{marginTop: '20px'}}>
                        <Grid item style={{marginRight: '150px'}}>
                            <Button color="primary" variant="contained">Filter</Button>
                        </Grid>

                        <Grid item>
                            <Button color="primary" variant="contained" style={{marginRight: '10px'}}>Approve</Button>
                            <Button color="primary" variant="contained">Decline</Button>
                        </Grid>
                    </Grid>

                    {/*Container to hold the table*/}
                    <Grid container justify="center" style={{marginTop: '20px'}}>
                        <Grid item>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Username</TableCell>
                                        <TableCell align="right">Email Count</TableCell>
                                        <TableCell align="right">User Type</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.filteredUsers.map((user, i) => {
                                        const isSelected = this.isSelected(i);
                                        return (<TableRow hover
                                                          aria-checked={!(() => this.isSelected(i))}
                                                          selected={isSelected}
                                                          key={i}
                                                          onClick={event => this.handleRowClick(event, i)}>
                                            <TableCell align="right">{user.username}</TableCell>
                                            <TableCell align="right">{user.email_count}</TableCell>
                                            <TableCell align="right">{user.user_type}</TableCell>
                                            <TableCell align="right">{user.status}</TableCell>
                                        </TableRow>);
                                    })}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container justify="center" style={{marginTop: '20px'}}>
                        <Grid item>
                            <Button color="primary" variant="contained" style={{paddingRight: '30px', paddingLeft: '30px'}}>Back</Button>
                        </Grid>
                    </Grid>

                </Grid>
            </div>
        )
    }
}