import React, {Component} from 'react';
import {Field, reduxForm, FieldArray, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import {
    Button, Menu, MenuItem, ListItemText, List, ListItem, Select, ListItemSecondaryAction, IconButton,
    InputLabel, FormControl
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ProfileForm from "../forms/ProfileForm/ProfileForm";
import {Employee} from "../../entities/Employee";
import {response_messages} from "../../entities/constants";
import { Link } from "react-router-dom";
export class EmployeeManageProfile extends Component {
    hr = new XMLHttpRequest();
    hash = null;
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            employee: new Employee('', '', '', '', '',
                '', '', '', '',
                '', [], ''),
            enterEmail: '',
            emails: []

        };
        this.hash = props.location.hash.substring(1);
    }

    componentDidMount() {
        this._isMounted = true;
        const url = 'http://localhost:5000/e_manage_profile?username=' + this.hash;
        console.log(this.hash);
        this.hr.open('GET', url);
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat[0]);
                console.log(ret_dat[0]['email'].split(','));
                this.state.emails = ret_dat[0]['email'].split(',');
                this.state.employee = ret_dat[0];
                this.state.employee.emails = ret_dat[0]['email'].split(',');
                console.log(this.state);
                this.setState(this.state);
            }
        };
        this.hr.send();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleUpdate = (e) => {
        console.log(e);
        console.log('mai')
    };

    render() {
        return (
            <div>
                <div>
                    <Grid container justify="center" item xs={12}><h1>Manage Profile</h1></Grid>
                    <Grid container justify="center">
                        <Grid item md={6}>
                            <strong>First name:</strong>
                            <TextField
                                value={this.state.employee.first_name}
                                onChange={this.handleInfo('first')}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <strong>Last name:</strong>
                            <TextField
                                value={this.state.employee.last_name}
                                onChange={this.handleInfo('last')}
                            />
                        </Grid>

                        <Grid item md={6}>
                            <strong>User name: </strong> {this.state.employee.username}
                        </Grid>
                        <Grid item md={6}>
                            <strong>Site name: </strong> {this.state.employee.site_name}
                        </Grid>

                        <Grid item md={6}>
                            <strong>Employee ID: </strong> {this.state.employee.emp_ID}
                        </Grid>
                        <Grid item md={6}>
                            <strong>Phone: </strong>
                            <TextField
                                value={this.state.employee.phone}
                                onChange={this.handleInfo('phone')}
                            />
                        </Grid>
                        <Grid item md={12}>
                            {/*<strong>Address: </strong> {this.state.employee[0].address}*/}
                        </Grid>

                        <Grid item md={12}>
                            <TextField
                                label="New Email"
                                value={this.state.enterEmail}
                                onChange={this.handleInfo('newEmail')}
                            />
                            <Button variant="contained" onClick={this.handleAddEmail}
                                    disabled={!(this.state.enterEmail &&
                                        !this.state.employee.emails.includes(this.state.enterEmail)
                                        && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.enterEmail))}>
                                Add Email
                            </Button>
                        </Grid>
                        {
                            this.state.employee.emails.map((email, indx) => (
                                <Grid item md={8} key={indx}>
                                    <strong> {email} </strong> < Button variant={"outlined"}
                                                                        onClick={this.handleRemove(email, indx)}> Remove </Button>
                                </Grid>
                            ))
                        }

                        <Grid item md={6}>
                            <Button color={"primary"} variant={"outlined"} onClick={this.update}>Update</Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button color={"primary"} variant={"outlined"} component={Link}
                            to={{
                                pathname: '/functionality',
                                hash: this.hash
                            }}
                            >Back</Button>
                        </Grid>
                    </Grid></div>
            </div>
        )
    }

    handleAddEmail = () => {
        this.state.employee.emails.push(
            this.state.enterEmail
        );
        this.setState(this.state);
    };

    handleRemove = (email, indx) => event => {
        this.state.employee.emails.splice(indx, 1);
        this.setState(this.state);
    };

    back = e => {
        console.log("Back!");
    };

    update = e => {
        console.log(this.state);
        let emailList = '';
        this.state.employee.emails.forEach((ema) => {
            emailList = emailList + ',' + ema;
        });
        emailList = emailList.substring(1);
        const body = {
            'emp_id' : this.state.employee.emp_ID,
            'fname' : this.state.employee.first_name,
            'lname' : this.state.employee.last_name,
            'phone': this.state.employee.phone,
            'emails' : emailList
        };
        console.log(body);
        this.hr.open('POST', 'http://localhost:5000/e_manage_profile');
        this.hr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                console.log('success');
            }
        };
        this.hr.send(JSON.stringify(body));
    };

    handleInfo = (type) => e => {
        switch (type) {
            case 'first':
                this.state.employee.fname = e.target.value;
                break;
            case 'last':
                this.state.employee.lname = e.target.value;
                break;
            case 'phone':
                this.state.employee.phone = e.target.value;
                break;
            case 'newEmail':
                this.state.enterEmail = e.target.value;
                break;
        }
        this.setState(this.state);
    }
}
