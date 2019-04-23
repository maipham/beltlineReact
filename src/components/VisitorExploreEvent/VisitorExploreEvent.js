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
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

export class VisitorExploreEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            keyword: '',
            siteName: 'ALL',
            startDate: '',
            endDate: '',
            visitRangeLow: '',
            visitRangeHigh: '',
            ticketRangeLow: '',
            ticketRangeHigh: '',
            includeVisited: null,
            includeSoldOut: null,
            anchorEl: null,
            selected: null,
            initialEvents: [],
            filteredEvents: [],
            sites: [],
            currUser: "mary.smith" //props.location.hash === null ? null : props.location.hash.slice(1)
        }
    }

    onTicketLowChange = (event) => {
        this.setState({
            ticketRangeLow: event.target.value
        });
    };

    onTicketHighChange = (event) => {
        this.setState({
            ticketRangeHigh: event.target.value
        });
    };

    onVisitLowChange = (event) => {
        this.setState({
            visitRangeLow: event.target.value
        });
    };

    onVisitHighChange = (event) => {
        this.setState({
            visitRangeHigh: event.target.value
        });
    };

    handleSiteClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleSiteOptionClick = event => {
        this.setState({
            anchorEl: null,
            siteName: event.target.innerText
        })
    };

    handleStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }

    handleEndDate = (event) => {
        this.setState({endDate: event.target.value});
    }

    handleClose = (event, value) => {
        this.setState({anchorEl: null});
    };

    handleChangeVisited = name => event => {
        this.setState({ includeVisited: event.target.checked });
    };

    handleChangeEvent = name => event => {
        this.setState({ includeSoldOut: event.target.checked });
    };

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    componentDidMount() {
        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/v_explore_event?';

        hr.open('GET', url + "username=" + this.state.currUser);

        hr.onreadystatechange = (event) => {
            {/* Stage 4 is ready state, status 200 is ready status */
            }
            if (event.target.readyState === 4 && event.target.status === 200) {
                {/*Response Text is data from backend*/
                }
                const data = JSON.parse(event.target.responseText);
                console.log(data);
                let sites = [];
                data[1].forEach(function(e) {
                    sites.push(e.name);
                });
                this.setState({
                    initialEvents: data[0],
                    filteredEvents: data[0],
                    sites: sites
                });
                console.log(data);
            }
        };

        hr.send();
    }

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                {/*Container that holds the header*/}
                <Grid container justify="center">
                    <h1>Explore Event</h1>
                </Grid>

                {/*container for the Name and the Keyword*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '45px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Name</InputLabel>
                        <TextField onClick={this.handletNameChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>Description Keyword</InputLabel>
                        <TextField onClick={this.handleKeyword}/>
                    </Grid>
                </Grid>

                {/*Container to hold the Manager and Check Boxes*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '135px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Site Name</InputLabel>
                        <Button aria-owns={anchorEl ? 'site_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSiteClick}> {this.state.siteName} </Button>
                        <Menu
                            id="site_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                        >
                            {this.state.sites.map( (sites, index) =>
                                <MenuItem key={index} onClick={this.handleSiteOptionClick} value={sites}>{sites}</MenuItem>)}
                        </Menu>
                    </Grid>
                </Grid>

                {/*container for the start date and the end date*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '80px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Start Date</InputLabel>
                        <TextField id="startdate"
                                   type="date"
                                   defaultValue="01/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleStartDate}/>
                    </Grid>
                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>End Date</InputLabel>
                        <TextField id="enddate"
                                   type="date"
                                   defaultValue="01/01/2019"
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleEndDate}/>
                    </Grid>
                </Grid>

                {/*container for the duration range  and the visit range text fields*/}
                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item style={{marginRight: '15px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Total Visit Range</InputLabel>
                        <TextField style={{width: '40px', marginRight: '10px'}}onClick={this.onVisitLowChange}/>
                        <TextField style={{width: '40px', marginLeft: '10px'}} onClick={this.onVisitHighChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '10px'}}>Ticket Price Range</InputLabel>
                        <TextField style={{width: '40px', marginRight: '10px'}} onClick={this.onTicketLowChange}/>
                        <TextField style={{width: '40px', marginLeft: '10px'}} onClick={this.onTicketHighChange}/>
                    </Grid>
                </Grid>

                <Grid style={{marginTop: '30px'}} container justify="center">
                    <Grid item style={{marginRight: '30px'}}>
                        <FormControlLabel control={
                            <Checkbox
                                checked={!!this.state.includeVisited}
                                onChange={this.handleChangeVisited('includeVisited')}
                                value=""
                                color="primary"/>}label={"Include Visited"} />
                    </Grid>

                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                checked={!!this.state.includeSoldOut}
                                onChange={this.handleChangeEvent('includeSoldOut')}
                                value=""
                                color="primary"/>}label={"Include Sold Out Event"} />
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '100px'}}>
                        <Button color='primary' variant='contained' style={{paddingRight: '30px', paddingLeft: '30px'}}>Filter</Button>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained"  component={Link}
                                to={{pathname: '/visitor_event_detail', hash: this.hash}}
                        >Event Detail</Button>
                    </Grid>
                </Grid>


                {/*container for the table*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Event Name</TableCell>
                                    <TableCell align="right">Site Name</TableCell>
                                    <TableCell align="right">Ticket Price</TableCell>
                                    <TableCell align="right">Ticket Remaining</TableCell>
                                    <TableCell align="right">Total Visits</TableCell>
                                    <TableCell align="right">My Visits</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.filteredEvents.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow selected={isSelected}
                                                      hover
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{transit.event_name}</TableCell>
                                        <TableCell align="right">{transit.site_name}</TableCell>
                                        <TableCell align="right">{transit.ticket_price}</TableCell>
                                        <TableCell align="right">{transit.tickets_remaining}</TableCell>
                                        <TableCell align="right">{transit.total_visits}</TableCell>
                                        <TableCell align="right">{transit.my_visits}</TableCell>
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