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

export class StaffViewSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            keyword: '',
            startDate: '',
            endDate: '',
            staff: [1,2,3,4,5],
            selected: null
        }
    }

    handleStartDate = (event) => {
        this.setState({startDate: event.target.value});
    }

    handleEndDate = (event) => {
        this.setState({endDate: event.target.value});
    }

    handleEventName = (event) => {
        this.setState({
            eventName: event.target.value
        });
    };

    handleKeyword = (event) => {
        this.setState({
            keyword: event.target.value
        });
    };

    isSelected = id => id === this.state.selected;

    handleRowClick = (event, i) => {
        this.setState({
            selected: i
        })
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                <Grid container justify="center">
                    <Grid item>
                        <h1>View Schedule</h1>
                    </Grid>
                </Grid>

                {/*container for the first name and the last name*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '45px'}}>
                        <InputLabel style={{marginRight: '15px'}}>Event Name</InputLabel>
                        <TextField onClick={this.handleEventName}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '15px'}}>Description Keyword</InputLabel>
                        <TextField onClick={this.handleKeyword}/>
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

                {/*container for the filter button*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item style={{marginRight: '150px'}}>
                        <Button color="primary" variant="contained">Filter</Button>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained">View Event</Button>
                    </Grid>
                </Grid>

                {/*container for the table*/}
                <Grid style={{marginTop: '20px'}} container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Staff Name</TableCell>
                                    <TableCell align="right">Site Name</TableCell>
                                    <TableCell align="right">Start Date</TableCell>
                                    <TableCell align="right">End Date</TableCell>
                                    <TableCell align="right">Staff Count</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.staff.map((transit, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow selected={isSelected}
                                                      hover
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="right">{i}</TableCell>
                                        <TableCell align="right">{i}</TableCell>
                                        <TableCell align="right">{i}</TableCell>
                                        <TableCell align="right">{i}</TableCell>
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