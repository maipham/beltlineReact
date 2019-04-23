import Grid from "@material-ui/core/Grid";
import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const testManagers = ["James Johnson", "Michael Smith", "Reece Gao", "Frank Zhou", "Mai Pham", "Alex McQuilken"]

export class AdminEditSite extends Component {
     hr = new XMLHttpRequest();
     old_name = '';
    constructor(props) {
        super(props);
        this.old_name = this.props.location.state.site_name;
        console.log(this.old_name)
        this.state = {
            name: this.props.location.state.site_name,
            zipcode:  '',
            address: '',
            manager: this.props.location.state.name,
            openEveryday: this.props.location.state.open_everyday,
            anchorEl: null,
            manager_list: [],
            selected: -1
        }
    }

    componentDidMount() {
        let site = 'http://localhost:5000/edit_site?site_name=' + this.state.name;
        this.hr.open('GET', site);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                console.log(data[0]);
                console.log(data);

                this.setState({
                    address: (data[0].address === null) ? '' : data[0].address,
                    zipcode: data[0].zipcode,
                    openEveryday: (data[0]['open']  === 'Yes'),
                    manager_list : data[1]
                });
            }
        };

        this.hr.send();
    }

    updateSite = () => {
        let open = 'No';
        if (this.state.openEveryday) {
            open = 'Yes';
        }
        console.log(open);
        const body = {
            'new_name' : this.state.name,
            'old_name' : this.old_name,
            'new_zip' : this.state.zipcode,
            'new_address' : this.state.address,
            'new_manager' : this.state.manager,
            'new_open' : open
        };
        console.log(body);
        this.hr.open('POST', 'http://localhost:5000/edit_site');
        this.hr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                console.log("successful");
            }
        };
        this.hr.send(JSON.stringify(body));
    };

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

    handleManagerOptionClick = (event) => {
        const man = event.target.innerText;
        const list = this.state.manager_list;
        let chosen = '';
        list.forEach((m) => {
            if (man === m[1]) {
                chosen = m[0];
            }
        });
        this.state.manager = chosen;
        this.setState(this.state);
    };

    handleChange = name => (event) => {
        if (this.state.openEveryday === true) {
            this.state.openEveryday = false;
            this.setState(this.state);
            console.log(false)
        } else {
            this.state.openEveryday = true;
            this.setState(this.state);
        }
    };

    render() {
        const {anchorEl} = this.state;
        return (
            <div>
                {/*Container that holds the header*/}
                <Grid container justify="center">
                    <h1>Edit Site</h1>
                </Grid>

                {/*Container that holds the Name and Zipcode TextFields*/}
                <Grid container justify="center">
                    <Grid item style={{marginRight: '20px'}}>
                        <InputLabel style={{marginRight: '10px'}}>Name</InputLabel>
                        <TextField defaultValue={this.state.name} onChange={this.handleNameChange}/>
                    </Grid>

                    <Grid item>
                        <InputLabel style={{marginRight: '10px'}}>Zipcode</InputLabel>
                        <TextField value={this.state.zipcode} onChange={this.handleZipChange}/>
                    </Grid>
                </Grid>

                {/*Container to hold the address*/}
                <Grid container justify="center" style={{marginTop: '30px'}}>
                    <Grid item style={{marginRight: '0px'}}>
                        <InputLabel>Address</InputLabel>
                        <TextField defaultValue={this.state.address} value={this.state.address}
                                   onChange={this.handleAddressChange} style={{width: '420px'}}/>
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
                            onClose={this.handleClose}
                        >
                            {this.state.manager_list.map((manager, index) =>
                                <MenuItem key={index} onClick={this.handleManagerOptionClick} value={manager[1]}>{manager[1]}</MenuItem>)}
                        </Menu>
                    </Grid>

                    <Grid item>
                        <FormControlLabel control={
                            <Checkbox
                                checked={(this.state.openEveryday === true)}
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
                        <Button
                            disabled={!((this.state.zipcode.length > 4 && parseInt(this.state.zipcode) > 0) && this.state.name )}
                            color='primary' onClick={this.updateSite} variant='contained'
                            style={{paddingRight: '60px', paddingLeft: '60px'}}>Update</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}