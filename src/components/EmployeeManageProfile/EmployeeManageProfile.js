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

export class EmployeeManageProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            phoneNumber: '',
            emails: [],
            email: '',
            visitorAccount: false
        }
    }

    render() {
        return (
            <form onSubmit>
                {/*container to hold the first name and last name*/}
                <Grid container>
                    <Grid item>

                    </Grid>

                    <Grid item>


                    </Grid>
                </Grid>


            </form>
        )
    }


}