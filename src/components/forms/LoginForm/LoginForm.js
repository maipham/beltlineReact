import React, {Component} from 'react';
import './LoginForm.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {renderField} from "../form-templates";
import {validate} from "../form-templates";
import {Field, reduxForm} from 'redux-form';
import {Link} from "react-router-dom";

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={16} direction="column" justify="center" alignItems="center">
                        <Grid item>
                            <Field name="email" type="email" component={renderField} label="email"/>
                        </Grid>
                        <Grid item>
                            <Field name="password" type="password" component={renderField} label="Password"/>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" justify="center">
                        <Button type="submit" variant="outlined">Login</Button>
                        <Button variant="outlined" component={Link} to={'/reg_nav'}>Register</Button>
                    </Grid>
                </form>
            </div>
        );
    }
}
LoginForm = reduxForm({
    form: 'login-form',  // a unique identifier for this form
    validate,
})(LoginForm);

// export default LoginForm;
