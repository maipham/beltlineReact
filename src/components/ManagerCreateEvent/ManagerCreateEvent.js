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

export class ManagerCreateEvent extends Component {
    hr = new XMLHttpRequest();
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            capacity: '',
            minStaff: '',
            startDate: '2019-04-23',
            endDate: '2019-04-30',
            description: '',
            availStaff: [],
            assignedStaff: []
        }
    }

    componentDidMount() {

        this.hr.open('GET',
            'http://localhost:5000/m_create_event?start_date=2019-04-23&end_date=2019-04-30');
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat);
                this.state.availStaff = ret_dat;
                this.setState(this.state);
            }
        };
        this.hr.send();
    }

    createEvent = (e) => {
        if (this.state.name.length > 1) {
            this.hr.open('POST',
                'http://localhost:5000/m_create_event');
            this.hr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            let staffs = '';
            this.state.assignedStaff.forEach((i) => {
                staffs = staffs + ',' + this.state.availStaff[i].username;
            });
            console.log(staffs);
            const body = {
                'event_name': this.state.name,
                'event_start': this.state.startDate,
            'site_name': 'Inman Park',
            'end_date': this.state.endDate,
            'min_staff': this.state.minStaff,
            'price': this.state.price,
            'capacity': this.state.capacity,
            'description': this.state.description,
            'staffs': staffs.substring(1)
            };
            console.log(body);
            this.hr.onreadystatechange = (e) => {
                if (e.target.readyState === 4 && e.target.status === 200) {
                    console.log('sucess');
                }
            };
            this.hr.send(JSON.stringify(body));
        }
    };

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
        this.hr.open('GET',
            'http://localhost:5000/m_create_event?start_date=' + this.state.startDate + '&end_date=2019-04-30');
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat);
                this.state.availStaff = ret_dat;
                this.setState(this.state);
            }
        };
        this.hr.send();
    };

    handleEndDateChange = (event) => {
        this.setState({
            endDate: event.target.value
        });
        this.hr.open('GET',
            'http://localhost:5000/m_create_event?start_date=' + this.state.startDate + '&end_date=' + this.state.endDate);
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat);
                this.state.availStaff = ret_dat;
                this.setState(this.state);
            }
        };
        this.hr.send();
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
                        <TextField defaultValue={'2019-04-23'} onChange={this.handleStartDateChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '25px'}}>End Date</InputLabel>
                        <TextField defaultValue={'2019-04-30'} onChange={this.handleEndDateChange}/>
                    </Grid>
                </Grid>

                {/*container for the description*/}
                <Grid container justify="center" style={{marginTop: '20px'}}>
                    <Grid item style={{marginRight: '20px'}}>
                        <InputLabel>Description</InputLabel>
                    </Grid>
                    <Grid item>
                        <TextField onChange={this.handleDescriptionChange} margin="normal" variant="outlined" multiline
                                   rows="6" style={{width: '500px'}}/>
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
                                {this.state.availStaff.map((staff, i) => {
                                    const isSelected = this.isSelected(i);
                                    return (<TableRow hover
                                                      aria-checked={!(() => this.isSelected(i))}
                                                      selected={isSelected}
                                                      key={i}
                                                      onClick={event => this.handleRowClick(event, i)}>
                                        <TableCell align="center">{staff.staff_name}</TableCell>
                                    </TableRow>);
                                })}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '40px'}}>
                    <Grid item>
                        <Button color="primary" variant="contained"
                                style={{marginRight: '110px', width: '120px'}}>Back</Button>
                    </Grid>

                    <Grid item>
                        <Button color="primary" variant="contained"
                                disabled={(
                                    !(this.state.assignedStaff.length > 0) && (this.state.name === ''))
                                } onClick={this.createEvent}
                                style={{marginLeft: '110px', width: '120px'}}>Create</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}