import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import {RadioGroup} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/es/Radio/Radio";
import MenuItem from "@material-ui/core/MenuItem";

const validate = values => {
    const errors = {};
    const requiredFields = [ 'firstName', 'lastName', 'email', 'favoriteColor', 'notes' ];
    requiredFields.forEach(field => {
        if (!values[ field ]) {
            errors[ field ] = 'Required'
        }
    });
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};


const mat_form = props => {
};

