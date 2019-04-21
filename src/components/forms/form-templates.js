import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Field from "redux-form/es/Field";
import IconButton from "@material-ui/core/IconButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";

export const validate = values => {
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

export const renderField = ({input, label, defaultValue, type, meta: {touched, error, warning}}) => {
    return (
        <Grid container direction="column" justify="center">
            <Grid item>
                <TextField {...input} label={label} defaultValue={defaultValue} type={type}/>
            </Grid>
            <Grid item>
                {touched && ((error && <span style={{"color": "red"}}>{error}</span>) || (warning &&
                    <span>{warning}</span>))}
            </Grid>
        </Grid>
    )
};

export const renderFieldArray = ({fields}) => (
    <Grid container direction="column" justify="center">
        <List>
            {fields.map((member, i) => (
                <ListItem key={i}>
                    <Field name={`email${i}`} type='email' component={renderField}/>
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Delete" onClick={() => {fields.remove(i)}}>
                            {/*<DeleteIcon />*/}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}

            <ListItem>
                <Button variant="outlined" onClick={() => fields.push({})}>Add Another Email</Button>
            </ListItem>

        </List>
    </Grid>
);


export const renderCheckbox = ({input, label}) => (
    <Checkbox label={label}
              checked={!!input.value}
              onCheck={input.onChange}/>
);

export const renderRadioGroup = ({input, ...rest}) => (
    <RadioGroup {...input} {...rest}
                valueSelected={input.value}
                onChange={(event, value) => input.onChange(value)}/>
);

export const renderSelectField = ({input, label, meta: {touched, error}, children, ...custom}) => (
    <Select label={label}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}>
    </Select>
);
