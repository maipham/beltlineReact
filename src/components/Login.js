import React, { Component } from 'react';
import { Button } from './Button/Button.js';
import Grid from "@material-ui/core/Grid";
import LoginForm from "./forms/LoginForm/LoginForm";

export class Login extends Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (e) => {
        console.log(e);
        // console.log(e['email']);
    };

    render() {
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Login User</h1></Grid>
                <LoginForm onSubmit={this.handleSubmit}/>
            </div>
        );
    }
}