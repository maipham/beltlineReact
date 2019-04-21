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

const staff = ["Reece Gao", "Frank Zhou", "Mai Pham", "Alex McQuilken"];

export class ManagerCreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            capacity: '',
            minStaff: '',
            startDate: '',
            endDate: '',
            description: '',
            availStaff: staff,
            assignedStaff: []
        }
    }

    isSelected = id => this.state.assignedStaff.includes(id);

    handleRowClick = (event, i) => {
        let newClicked = this.state.assignedStaff;
        if (newClicked.includes(i)) {
            let index = newClicked.indexOf(i);
            if (index !== -1) {
                newClicked.splice(index, 1);
                this.setState({
                    assignedStaff: newClicked
                });
            }
        } else {
            newClicked.push(i);
            this.setState({
                assignedStaff: newClicked
            });
        }
    };

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handlePriceChange = (event) => {
        this.setState({
            price: event.target.value
        });
    };

    handleCapacityChange = (event) => {
        this.setState({
            capacity: event.target.value
        });
    };

    handleStaffChange = (event) => {
        this.setState({
            minStaff: event.target.value
        });
    };

    handleStartDateChange = (event) => {
        this.setState({
            startDate: event.target.value
        });
    };

    handleEndDateChange = (event) => {
        this.setState({
            endDate: event.target.value
        });
    };

    handleDescriptionChange = (event) => {
        this.setState({
            description: event.target.value
        });
    };

    render() {
        return (
            <div>
                {/*container for the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Create Event</h1>
                    </Grid>
                </Grid>

                {/*container for the name*/}
                <Grid container justify="center">
                    <Grid item>
                        <InputLabel style={{marginRight: '25px'}}>Name</InputLabel>
                        <TextField onChange={this.handleNameChange} style={{width: '500px'}}/>
                    </Grid>
                </Grid>

                {/*container for the price, capacity, and min staff*/}
                <Grid container style={{marginTop: '25px'}} justify="center">
                    <Grid item style={{marginRight: '25px'}}>
                        <InputLabel style={{marginRight: '25px'}}>Price</InputLabel>
                        <TextField onChange={this.handlePriceChange} style={{width: '40px'}}/>
                    </Grid>
                    <Grid item style={{marginRight: '25px'}}>
                        <InputLabel style={{marginRight: '25px'}}>Capacity</InputLabel>
                        <TextField onChange={this.handleCapacityChange} style={{width: '40px'}}/>
                    </Grid>
                    <Grid item>
                        <InputLabel style={{marginRight: '25px'}}>Minimum Staff Required</InputLabel>
                        <TextField onChange={this.handleStaffChange} style={{width: '80px'}}/>
                    </Grid>
                </Grid>

                {/*container for the start date and the end date*/}
                <Grid container style={{marginTop: '25px'}} justify="center">
                    <Grid item>
                        <InputLabel style={{marginRight: '25px'}}>Start Date</InputLabel>
                        <TextField onChange={this.handleStartDateChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '25px'}}>End Date</InputLabel>
                        <TextField onChange={this.handleEndDateChange}/>
                    </Grid>
                </Grid>

                {/*container for the description*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item style={{marginRight: '20px'}}>
                        <InputLabel>Description</InputLabel>
                    </Grid>
                    <Grid item>
                        <TextField onChange={this.handleDescriptionChange} margin="normal" variant="outlined" multiline rows="6" style={{width: '500px'}}/>
                    </Grid>
                </Grid>

                {/*container for the available staff table*/}
                <Grid container justify="center">
                    <Grid item>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Available Staff</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {staff.map((staff, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow hover
                                                      aria-checked={!(() => this.isSelected(i))}
                                                      selected={isSelected}
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="center">{staff}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '40px'}}>
                    <Grid item>
                        <Button color="primary" variant="contained" style={{marginRight: '110px', width: '120px'}}>Back</Button>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained" style={{marginLeft: '110px', width: '120px'}}>Create</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}