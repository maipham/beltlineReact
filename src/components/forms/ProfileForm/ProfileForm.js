
import React, { Component } from 'react';
import './ProfileForm.css';
import Grid from "@material-ui/core/Grid";
import {Field, reduxForm} from "redux-form";
import {renderField} from "../form-templates";
import { validate } from "../form-templates";

export default class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };
    render() {
        const { handleUpdate, fname, lname, username, site_name, employee_id, phone, address, emails } = this.props;
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Manage Profile</h1></Grid>
                <form onSubmit={handleUpdate}>
                    <Grid container spacing={32} justify="center" direction="row">
                        <Grid item>
                            <Field name="firstName" defaultValue={fname} component={renderField} label="First Name" />
                        </Grid>
                        <Grid item>
                            <Field name="lastName" component={renderField} label="Last Name"/>
                        </Grid>
                    </Grid>
                </form>

            </div>
        );
    }
}


ProfileForm= reduxForm({
    form: 'profile-form',  // a unique identifier for this form
    validate,
    // asyncValidate
})(ProfileForm);

