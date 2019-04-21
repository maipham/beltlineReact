import React, {Component} from 'react';
import './RegisterForm.css';
import {Field, reduxForm, FieldArray, formValueSelector} from 'redux-form';
import { connect } from 'react-redux';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Grid from "@material-ui/core/Grid";
import {Button, Menu, MenuItem, ListItemText, List, ListItem, Select, ListItemSecondaryAction, IconButton,
    InputLabel, FormControl} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {renderField} from "../form-templates";
import { validate } from "../form-templates";


export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            email: ''
        }
    }

    us_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
        'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
        'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
        'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
        'WI', 'WY'];


    handleAddEmail = (e) => {

        // console.log("from on click");
        let a = this.state.emails;
        if (this.state.email && !a.includes(this.state.email)) {
            a.push(this.state.email);
        }
        this.setState({emails: a,
            email: ' '});
        // console.log(this.state.emails);
    };

    handleEmailDelete = (e, i) => {
        let b = this.state.emails;
        this.setState({emails: b.filter(email => email !== b[i])});
    };

    inputHandler = e => {
        this.setState({
            email: e.target.value
        });
    };

    render() {
        const {handleSubmit, handleStateClick, handleStateMenuClick, handleTypeClick, handleClose, user,
            handleMenuClick, pristine, reset, submitting, isEmployee, anchorEl, userType, anchorEl2, states,
            curr_state} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {/*first name and last name grid section*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="firstName" component={renderField} label="First Name" />
                    </Grid>
                    <Grid item>
                        <Field name="lastName" component={renderField} label="Last Name"/>
                    </Grid>
                </Grid>

                {/*username and user type grid section*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="username" component={renderField} label="Username" />
                    </Grid>
                    {isEmployee ?
                        <Grid item>
                            <Button variant="outlined"aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true"
                                    onClick={handleTypeClick}>{userType}</Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}>

                                <MenuItem onClick={handleMenuClick} value="Manager">Manager</MenuItem>
                                <MenuItem onClick={handleMenuClick} value="Staff">Staff</MenuItem>
                            </Menu>
                        </Grid> : null
                    }
                </Grid>

                {/*password and confirm password grid section*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="password" type="password" component={renderField} label="Password"/>
                    </Grid>
                    <Grid item>
                        <Field name="cpassword" type="password" component={renderField} label="Confirm Password"/>
                    </Grid>
                </Grid>

                {/*phone and address grid*/}
                {isEmployee ?
                    <Grid container spacing={32} justify="center" direction="row">
                        <Grid item>
                            <Field name="phone" component={renderField} label="Phone" />
                        </Grid>
                        <Grid item>
                            <Field name="address" component={renderField} label="Address" />
                        </Grid>
                    </Grid>
                    : null
                }

                {/*city, state, and zipcode grid*/}
                { isEmployee ?
                    <Grid container spacing={32} justify="center" direction="row">
                        <Grid item>
                            <Field name="city" component={renderField} label={"City"} />
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" aria-owns={anchorEl2 ? 'state-menu' : undefined} aria-haspopup="true"
                                    onClick={handleStateClick}>{curr_state}</Button>
                            <Menu
                                id="state-menu"
                                anchorEl={anchorEl2}
                                open={Boolean(anchorEl2)}
                                onClose={handleClose}>
                                {this.us_states.map((state, i) => (
                                    <MenuItem key={i} onClick={handleStateMenuClick} value={states[i]}>{states[i]}</MenuItem>
                                ))}
                            </Menu>
                        </Grid>
                        <Grid item>
                            <Field name="zipcode" component={renderField} label={"Zipcode"} />
                        </Grid>
                    </Grid>
                    : null
                }

                {/*display of entered emails*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item >
                        <Field value={this.state.email} onChange={this.inputHandler} name="email" component={renderField} label="Email" />
                        {this.state.emails.map( (email, i) => {
                            return (
                                <div key={i}>{email}</div>
                                );
                        })
                        }
                        {/*<List>*/}
                            {/*{this.state.emails.map((member, i) => (*/}
                                {/*<ListItem key={i}>*/}
                                    {/*<ListItemText primary={member}/>*/}
                                    {/*<ListItemSecondaryAction key={i}>*/}
                                        {/*<IconButton aria-label="Delete" onClick={e => this.handleEmailDelete(e, i)}>*/}
                                            {/*<DeleteIcon />*/}
                                        {/*</IconButton>*/}
                                    {/*</ListItemSecondaryAction>*/}
                                {/*</ListItem>*/}
                            {/*))}*/}
                        {/*</List>*/}
                        {/*<FieldArray name="allEmails" component={renderFieldArray}/>*/}
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={this.handleAddEmail(user)}
                                disabled={!(this.state.email &&
                                    !this.state.emails.includes(this.state.email)
                                    && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))}>Add Email</Button>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Button type="submit" variant="outlined">Register</Button>
                </Grid>
            </form>
        )
    }
}

RegisterForm = reduxForm({
    form: 'register-form',  // a unique identifier for this form
    validate,
})(RegisterForm);

export default RegisterForm;

