import Grid from "@material-ui/core/Grid";
import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export class AdminCreateSite extends Component {
    hr = new XMLHttpRequest();
    url = 'http://localhost:5000/a_create_site';
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            zipcode: '',
            address: '',
            manager: "--",
            username: '',
            managers: [],
            openEveryday: false,
            anchorEl: null
        }
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        });
    };

    handleZipChange = (event) => {
        this.setState({
            zipcode: event.target.value
        })
    }

    handleAddressChange = (event) => {
        this.setState({
            address: event.target.value
        })
    };

    handleClose = (event, value) => {
        this.setState({ anchorEl: null,
            anchorEl2: null});
    };

    handleManagerClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleManagerOptionClick = (e) => {
        const managers = this.state.managers;
        const selected_man = e.target.innerText;
        for (let i = 0; i < this.state.managers.length; i++) {
            if (managers[i].manager_name === selected_man) {
                this.state.manager = selected_man;
                this.state.username = managers[i].username;
                this.state.anchorEl = null;
                this.setState(this.state);
                break;
            }
        }
    };

    handleChange = name => event => {
        this.setState({ openEveryday: event.target.checked });
    };

    componentDidMount() {
        this.hr.open('GET', this.url);
        console.log(this.url);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                this.state.managers = data;
                this.setState(this.state);
                console.log(data);
            }
        };

        this.hr.send();
    }

    handleCreateClick = () => {
        this.hr.open('POST', this.url);
        this.hr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                console.log("successful");
            }
        };
        const name = this.state.name;
        const zip = this.state.zipcode;
        const address = this.state.address;
        const open = this.state.openEveryday ? 'Yes' : 'No';
        const manager = this.state.username;
        const obj = {'name': name, 'address': address, 'zip': zip, 'manager': manager, 'open': open};
        this.hr.send(JSON.stringify(obj));
        console.log(JSON.stringify(obj));
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                {/*Container that holds the header*/}
                <Grid container justify="center">
                    <h1>Create Site</h1>
                </Grid>

                {/*Container that holds the Name and Zipcode TextFields*/}
                <Grid container justify="center">
                    <Grid item style={{marginRight: '20px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Name</InputLabel>
                        <TextField onChange={this.handleNameChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel defaultValue={this.state.zipcode} style={{marginRight: '10px'}}>Zipcode</InputLabel>
                        <TextField onChange={this.handleZipChange}/>
                    </Grid>
                </Grid>

                {/*Container to hold the address*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '0px'}}>
                        <InputLabel>Address</InputLabel>
                        <TextField onChange={this.handleAddressChange} style={{width: '420px'}}/>
                    </Grid>
                    <div>
                    </div>
                </Grid>

                {/*Container to hold the Manager and Check Boxes*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '135px'}}>
                        <InputLabel>Manager</InputLabel>
                        <Button aria-owns={anchorEl ? 'type_menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleManagerClick}>{this.state.manager}</Button>
                        <Menu
                            id="type_menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}>
                            {this.state.managers.map((manager, index) =>
                                <MenuItem key={index} onClick={this.handleManagerOptionClick} value={manager.manager_name}>{manager.manager_name}</MenuItem>)}
                        </Menu>
                    </Grid>

                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                checked={!!this.state.openEveryday}
                                onChange={this.handleChange('openEveryday')}
                                value=""
                                color="primary"/>} label={"Open Everyday"} />
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '80px'}}>
                        <Button color='primary' variant='contained' style={{paddingRight: '60px', paddingLeft: '60px'}}>Back</Button>
                    </Grid>

                    <Grid item>
                        <Button disabled={!(this.state.manager !== '--' && this.state.name && this.state.zipcode && parseInt(this.state.zipcode, 10) > 9999)} color='primary'
                                variant='contained'
                                style={{paddingRight: '60px', paddingLeft: '60px'}}
                                onClick={this.handleCreateClick}>Create</Button>
                    </Grid>
                </Grid>



            </div>
        )
    }
}