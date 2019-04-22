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

export class EmployeeManageProfile extends Component {
    hr = new XMLHttpRequest();
    hash = null;
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            employee: new Employee(),
            enterEmail: ''
        };
        this.hash = props.location.hash.substring(1);
    }
    componentDidMount() {
        this._isMounted = true;

        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/get_user_info?username=' + this.hash;
        console.log(this.hash);
        hr.open('GET', url);
        hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                const ret_dat = JSON.parse(e.target.responseText);
                console.log(ret_dat[0][2]);
                if (ret_dat[0][2] === "Manager") {
                    this.hr.open('GET', 'http://localhost:5000/m_manage_profile=' + this.hash);
                }

            }
        };
        hr.send();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    isManger() {
    }

    handleUpdate = (e) => {
        console.log(e);
    };

    render() {
        return (
            <div>
            {/*<div>*/}
                {/*<Grid container justify="center" item xs={12}><h1>Manage Profile</h1></Grid>*/}
                {/*<Grid container justify="center">*/}
                    {/*<Grid item md={6}>*/}
                        {/*<TextField*/}
                            {/*label="First Name"*/}
                            {/*value={this.state.employee.fname}*/}
                            {/*onChange={this.handleInfo('first')}*/}
                        {/*/>*/}
                    {/*</Grid>*/}
                    {/*<Grid item md={6}>*/}
                        {/*<TextField*/}
                            {/*label="Last Name"*/}
                            {/*value={this.state.employee.fname}*/}
                            {/*onChange={this.handleInfo('last')}*/}
                        {/*/>*/}
                    {/*</Grid>*/}

                    {/*<Grid item md={6}>*/}
                        {/*<strong>User name: </strong> {this.state.employee.username}*/}
                    {/*</Grid>*/}
                    {/*<Grid item md={6}>*/}
                        {/*<strong>Site name: </strong> {this.state.employee.site}*/}
                    {/*</Grid>*/}

                    {/*<Grid item md={6}>*/}
                        {/*<strong>Employee ID: </strong> {this.state.employee.id}*/}
                    {/*</Grid>*/}
                    {/*<Grid item md={6}>*/}
                        {/*<TextField*/}
                            {/*label="Phone"*/}
                            {/*value={this.state.employee.phone}*/}
                            {/*onChange={this.handleInfo('phone')}*/}
                        {/*/>*/}
                    {/*</Grid>*/}
                    {/*<Grid item md={12}>*/}
                        {/*<strong>Address: </strong> {this.state.employee.address}*/}
                    {/*</Grid>*/}

                    {/*<Grid item md={12}>*/}
                        {/*<TextField*/}
                            {/*label="New Email"*/}
                            {/*value={this.state.enterEmail}*/}
                            {/*onChange={this.handleInfo('newEmail')}*/}
                        {/*/>*/}
                        {/*<Button variant="contained" onClick={this.handleAddEmail}*/}
                                {/*disabled={!(this.state.enterEmail &&*/}
                                    {/*!this.state.employee.emails.includes(this.state.enterEmail)*/}
                                    {/*&& /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.enterEmail))}>*/}
                            {/*Add Email*/}
                        {/*</Button>*/}
                    {/*</Grid>*/}
                    {/*{*/}

                        {/*this.state.employee.email.split(',').map((email, indx) => (*/}
                            {/*<Grid item md={8} key={indx}>*/}
                                {/*<strong> {email} </strong> < Button variant={"outlined"}*/}
                                                                    {/*onClick={this.handleRemove(email, indx)}> Remove </Button>*/}
                            {/*</Grid>*/}
                        {/*))*/}
                    {/*}*/}

                    {/*<Grid item md={6}>*/}
                        {/*<Button color={"primary"} variant={"outlined"} onClick={this.update}>Update</Button>*/}
                    {/*</Grid>*/}
                    {/*<Grid item md={6}>*/}
                        {/*<Button color={"primary"} variant={"outlined"} onClick={this.back}>Back</Button>*/}
                    {/*</Grid>*/}
                {/*</Grid></div>*/}
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
