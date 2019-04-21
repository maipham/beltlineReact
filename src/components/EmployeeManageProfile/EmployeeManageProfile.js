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

export class EmployeeManageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: new Employee('mpham', '', '12345678', 'Mai',
                'Pham', '706888888', 'emp',
                'Mt Zion', false, 'Site Name',
                ['mai@mail.com', 'mail@mai.com', 'com@mail.mai', 'com@mai.mail'], 'Mai ID'),
            enterEmail: ''
        }
    }

    handleUpdate = (e) => {
        console.log(e);
    };

    render() {
        return (
            <Grid container>
                <Grid item md={6}>
                    <TextField
                        label="First Name"
                        value={this.state.employee.fname}
                        onChange={this.handleInfo('first')}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextField
                        label="Last Name"
                        value={this.state.employee.lname}
                        onChange={this.handleInfo('last')}
                    />
                </Grid>

                <Grid item md={6}>
                    <strong>User name: </strong> {this.state.employee.username}
                </Grid>
                <Grid item md={6}>
                    <strong>Site name: </strong> {this.state.employee.site}
                </Grid>

                <Grid item md={6}>
                    <strong>Employee ID: </strong> {this.state.employee.id}
                </Grid>
                <Grid item md={6}>
                    <TextField
                        label="Phone"
                        value={this.state.employee.phone}
                        onChange={this.handleInfo('phone')}
                    />
                </Grid>
                <Grid item md={12}>
                    <strong>Address: </strong> {this.state.employee.address}
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
                    <Button color={"primary"} variant={"outlined"} onClick={this.back}>Back</Button>
                </Grid>
            </Grid>
        )
    }

    handleAddEmail = () => {
        this.state.employee.emails.push(
            this.state.enterEmail
        );
        this.setState(this.state);
    }

    handleRemove = (email, indx) => event => {
        this.state.employee.emails.splice(indx, 1);
        this.setState(this.state);
    }

    back = e => {
        console.log("Back!");
    }

    update = e => {
        console.log(this.state);
    }

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
