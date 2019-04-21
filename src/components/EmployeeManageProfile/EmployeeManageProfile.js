import React, {Component} from 'react';
import {Field, reduxForm, FieldArray, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import {Button, Menu, MenuItem, ListItemText, List, ListItem, Select, ListItemSecondaryAction, IconButton,
    InputLabel, FormControl} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import ProfileForm from "../forms/ProfileForm/ProfileForm";

export class EmployeeManageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: 'Mai',
            lastname: 'Pham',
            phoneNumber: '123456789',
            emails: ['mai@mail.com, mail@mai.com, com@mail.mai, com@mai.mail'],
            email: '',
            visitorAccount: false
        }
    }
    handleUpdate = (e) => {
        console.log(e);
    };

    render() {
        return (
            <ProfileForm onSubmit={this.handleUpdate} defaultValue={this.state.firstname}/>
        )
    }


}