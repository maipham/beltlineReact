import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from "@material-ui/core/Grid";
import React, { Component } from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const site_names = ['ALL','Piedmont Park', 'Atlanta Park', 'Atlanta Beltline Center', 'Historic Fourth Ward Park', 'Westview Cementary', 'Inman Park'];

export class ManagerManageStaff extends Component {
    constructor(props) {
        super(props);
        this.state = {
            site: 'ALL',
            firstName: '',
            lastName: '',
            startDate: '',
            endDate: '',
            staff: [1,2,3,4,5],
            anchorEl: null
        }
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
        this.setState({anchorEl: null});
    };

    handleStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }

    handleStartDate = (event) => {
        this.setState({endDate: event.target.value});
    }

    handleFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        });
    };

    handleLastName = (event) => {
        this.setState({
            lastName: event.target.value
        });
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1>Manage Staff</h1>
                    </Grid>
                </Grid>

                {/*container for the site*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>Site</InputLabel>
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
                </Grid>

                {/*container for the first name and the last name*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '45px'}}>
                        <InputLabel style={{marginRight: '15px'}}>First Name</InputLabel>
                        <TextField onClick={this.handleFirstName}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>Last Name</InputLabel>
                        <TextField onClick={this.handleLastName}/>
                    </Grid>
                </Grid>

                {/*container for the start date and the end date*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '45px'}}>
                        <InputLabel style={{marginRight: '15px'}}>First Name</InputLabel>
                        <TextField id="startdate"
                                   type="date"
                                   defaultValue="01/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleStartDate}/>
                    </Grid>
                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>Last Name</InputLabel>
                        <TextField id="enddate"
                                   type="date"
                                   defaultValue="01/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleStartDate}/>
                    </Grid>
                </Grid>

                {/*container for the filter button*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Button color="primary" variant="contained">Filter</Button>
                    </Grid>
                </Grid>

                {/*container for the table*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Staff Name</TableCell>
                                    <TableCell align="right"># Event Shifts</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.staff.map((transit, i) => {
                                    return (<TableRow hover
                                                      key={i}>
                                        <TableCell align="right">Alice Smith</TableCell>
                                        <TableCell align="right">{i}</TableCell>
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