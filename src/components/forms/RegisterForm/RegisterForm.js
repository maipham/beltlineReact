import React, {Component} from 'react';
import './RegisterForm.css';
import {Field, reduxForm} from 'redux-form';
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import {Button} from "@material-ui/core";

// const validations = {
//     username: [required(), length({ max: 15 })],
//     email: [required(), email()],
// };

const validate = values => {
    const errors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'cpassword'];
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
    console.log(touched, error, warning);
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
    }

    render() {
        const {handleSubmit, pristine, reset, submitting, employee} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <Grid container spacing={32} justify="center" direction="row">
                    {/*{employee ?*/}
                    <Grid item>
                            <Field name="firstName" component={renderField} label="First Name"/>
                    </Grid>
                        {/*: null}*/}
                    <Grid item>
                        <Field name="lastName" component={renderField} label="Last Name"/>
                    </Grid>
                </Grid>
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="password" type="password" component={renderField} label="Password"/>
                    </Grid>
                    <Grid item>
                        <Field name="cpassword" type="password" component={renderField} label="Confirm Password"/>
                    </Grid>
                </Grid>
                <Grid container spacing={32} justify="center" direction="row">
                    <Grid item>
                        <Field name="email" type="email" component={renderField} label="Email"/>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Button type="submit">Register</Button>
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

