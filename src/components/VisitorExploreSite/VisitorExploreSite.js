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

const openEveryday = ['ALL', 'YES', 'NO'];

export class VisitorExploreSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            siteName: 'ALL',
            openEveryday: 'ALL',
            startDate: '',
            endDate: '',
            visitRangeLow: '',
            visitRangeHigh: '',
            eventCountLow: '',
            eventCountHigh: '',
            includeVisited: null,
            anchorEl: null,
            anchorEl2: null,
            selected: null,
            initialSites: [],
            filteredSites: [],
            sites: [],
            currUser: props.location.hash === null ? null : props.location.hash.slice(1)
        }
    }

    handleEventCountLow = (event) => {
        this.setState({
            eventCountLow: event.target.value
        });
    };

    handleEventCountHigh = (event) => {
        this.setState({
            eventCountHigh: event.target.value
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

    handleOpenClick = event => {
        this.setState({ anchorEl2: event.currentTarget });
    };

    handleOpenClickOption = event => {
        this.setState({
            anchorEl2: null,
            openEveryday: event.target.innerText
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

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    componentDidMount() {
        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/v_explore_site?';

        console.log(this.state.currUser);

        hr.open('GET', url + "username=" +this.state.currUser);

        hr.onreadystatechange = (event) => {
            {/* Stage 4 is ready state, status 200 is ready status */}
            if (event.target.readyState === 4 && event.target.status === 200) {
                {/*Response Text is data from backend*/}
                const data = JSON.parse(event.target.responseText);

                console.log(data);

                var arr = data[1].map((siteObj, i) => {return siteObj.name});

                console.log(arr);
                this.setState({
                    initialSites: data[0],
                    filteredSites: data[0],
                    sites: arr
                });
                //console.log(data);
            }
        };

        hr.send();
    }

    render() {
        const {anchorEl, anchorEl2} = this.state;
        return (
            <div>
                {/*Container that holds the header*/}
                <Grid container justify="center">
                    <h1>Explore Site</h1>
                </Grid>

                {/*container for the Name and the Keyword*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '45px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Name</InputLabel>
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

                    <Grid item>
                        <InputLabel>Site</InputLabel>
                        <Button aria-owns={anchorEl2 ? 'site_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleSiteClick}> {this.state.siteName} </Button>
                        <Menu
                            id="site_menu"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
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
                        <InputLabel style={{marginRight: '10px'}}>Event Count Range</InputLabel>
                        <TextField style={{width: '40px', marginRight: '10px'}} onClick={this.handleEventCountLow}/>
                        <TextField style={{width: '40px', marginLeft: '10px'}} onClick={this.handleEventCountHigh}/>
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

                </Grid>

                {/*BUTTONS*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '100px'}}>
                        <Button color='primary' variant='contained' style={{paddingRight: '30px', paddingLeft: '30px'}}>Filter</Button>
                    </Grid>

                    <Grid item style={{marginRight: '10px'}}>
                        <Button color="primary" variant="contained">
                            <Link style={{textDecoration: 'none', color: 'white'}}
                                  to={{
                                      pathname: '/site_detail',
                                      state: {
                                          site_name: this.state.selected === null ? null : this.state.initialSites[this.state.selected].site_name,
                                      }
                                  }}>Site Detail</Link>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button color="primary" variant="contained">
                            <Link style={{textDecoration: 'none', color: 'white'}}
                                  to={{
                                      pathname: '/transit_detail',
                                      state: {
                                          site_name: this.state.selected === null ? null : this.state.initialSites[this.state.selected].site_name,
                                      }
                                  }}>Transit Detail</Link>
                        </Button>
                    </Grid>
                </Grid>


                {/*container for the table*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Site Name</TableCell>
                                    <TableCell align="right">Event Count</TableCell>
                                    <TableCell align="right">Total Visits</TableCell>
                                    <TableCell align="right">My Visits</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.filteredSites.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow selected={isSelected}
                                                      hover
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{transit.site_name}</TableCell>
                                        <TableCell align="right">{transit.event_count}</TableCell>
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