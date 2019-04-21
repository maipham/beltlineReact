import React, {Component} from 'react';
import './RegisterForm.css';
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


const validate = values => {
    const errors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'cpassword', 'username', 'phone', 'address', 'city', 'zipcode',
        'city'];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }
    return errors
};

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {
    return (
        <Grid container direction="column" justify="center">
            <Grid item>
                <TextField {...input} label={label} type={type}/>
            </Grid>
            <Grid item>
                {touched && ((error && <span style={{"color": "red"}}>{error}</span>) || (warning &&
                    <span>{warning}</span>))}
            </Grid>
        </Grid>
    )
};


const renderCheckbox = ({input, label}) => (
    <Checkbox label={label}
              checked={!!input.value}
              onCheck={input.onChange}/>
);

const renderRadioGroup = ({input, ...rest}) => (
    <RadioGroup {...input} {...rest}
                valueSelected={input.value}
                onChange={(event, value) => input.onChange(value)}/>
);

const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
    <Select
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}/>
);


export class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            email: ''
        }
    }

    handleAddEmail = () => {
        let a = this.state.emails;
        if (this.state.email && !a.includes(this.state.email)) {
            a.push(this.state.email);
        }
        this.state.emails = a.slice();
        this.state.email = '';
        this.setState(this.state);
        console.log(this.state);
    }

    handleEmailDelete = (e, i) => {
        let b = this.state.emails;
        const filtered = b.filter(email => email !== b[i]);
        this.state.emails = filtered;
        this.setState(this.state);
    }

    inputHandler = e => {
        this.setState({
            email: e.target.value
        });
    }

    render() {
        const {
            handleSubmit, handleStateClick, handleStateMenuClick, handleTypeClick, handleClose,
            handleMenuClick, pristine, reset, submitting, employee, anchorEl, userType, anchorEl2, states,
            curr_state
        } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                {/*first name and last name grid section*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="firstName" component={renderField} label="First Name"/>
                    </Grid>
                    <Grid item>
                        <Field name="lastName" component={renderField} label="Last Name"/>
                    </Grid>
                </Grid>

                {/*username and user type grid section*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="username" component={renderField} label="Username"/>
                    </Grid>

                    <Grid item>
                        <Button variant="outlined" aria-owns={anchorEl ? 'simple-menu' : undefined} aria-haspopup="true"
                                onClick={handleTypeClick}>{userType}</Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>

                            <MenuItem onClick={handleMenuClick} value="Manager">Manager</MenuItem>
                            <MenuItem onClick={handleMenuClick} value="Staff">Staff</MenuItem>
                        </Menu>
                    </Grid>
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
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="phone" component={renderField} label="Phone"/>
                    </Grid>
                    <Grid item>
                        <Field name="address" component={renderField} label="Address"/>
                    </Grid>
                </Grid>

                {/*city, state, and zipcode grid*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="city" component={renderField} label={"City"}/>
                    </Grid>

                    <Grid item>


                        <Button variant="outlined" aria-owns={anchorEl2 ? 'state-menu' : undefined} aria-haspopup="true"
                                onClick={handleStateClick}>{curr_state}</Button>
                        <Menu
                            id="state-menu"
                            anchorEl={anchorEl2}
                            open={Boolean(anchorEl2)}
                            onClose={handleClose}>

                            {states.map((state, i) => (
                                <MenuItem key={i} onClick={handleStateMenuClick}
                                          value={states[i]}>{states[i]}</MenuItem>
                            ))}
                        </Menu>
                    </Grid>

                    <Grid item>
                        <Field name="zipcode" component={renderField} label={"Zipcode"}/>
                    </Grid>
                </Grid>

                {/*display of entered emails*/}
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="email" value={this.state.email} component={renderField} label="Email"
                               onChange={this.inputHandler}/>
                        <List>
                            {this.state.emails.map((member, i) => (
                                <ListItem key={i}>
                                    <ListItemText primary={member}/>
                                    <ListItemSecondaryAction key={i}>
                                        <IconButton aria-label="Delete" onClick={e => this.handleEmailDelete(e, i)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                        {/*<FieldArray name="allEmails" component={renderFieldArray}/>*/}
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={this.handleAddEmail}
                                disabled={!(this.state.email &&
                                    !this.state.emails.includes(this.state.email)
                                    && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email))}>
                            Add Email
                        </Button>
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
    // asyncValidate
})(RegisterForm);

export default RegisterForm;

