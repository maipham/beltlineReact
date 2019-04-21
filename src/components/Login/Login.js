import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import LoginForm from "../forms/LoginForm/LoginForm";
import {response_messages, user_type} from "../../entities/constants";
import {BrowserRouter, Link, Redirect, Route} from "react-router-dom";
import FunctionalityView from "../FunctionalityView/FunctionalityView";
import {Button} from "@material-ui/core";

export class Login extends Component {
    auth = false;

    constructor(props) {
        super(props);
        this.state = {
            signIn_success: false,
            username: null
        };
    }

    handleLogin = (val) => {
        // console.log(val);
        const hr = new XMLHttpRequest();
        const url = 'http://localhost:5000/validate_login?';
        const email = 'email=' + val.email;
        const password = 'password=' + val.password;
        hr.open('GET', url + email + '&' + password);
        hr.onreadystatechange = (e) => {
            // console.log(e);
            if (e.target.readyState === 4 && e.target.status === 200) {
                const response = JSON.parse(e.target.responseText);
                console.log(response);
                const message = response.message;
                const username = response.username;
                console.log(message);
                if (message === response_messages.account_exists) {
                    console.log("THIS SHIT EXISTS");
                    this.state.signIn_success = true;
                    this.state.username = username;
                    this.setState(
                        this.state
                    );
                    console.log(this.state);
                }
            }
        };
        hr.send();
    };


    render() {
        const {signIn_success} = this.state;
        console.log(signIn_success);
        return (
            <div>
                {this.state.signIn_success ?
                    <Redirect to={{
                        pathname: "/functionality",
                        hash: this.state.username}}/>
                    :
                    <div>
                        <Grid container justify="center" item xs={12}><h1>Login</h1></Grid>
                        <LoginForm onSubmit={this.handleLogin}/>
                    </div>
                }

                {/*<Button component={Link} disabled={!this.state.signIn_success} to={{pathname: "/functionality", hash: this.state.user_type}}>redirect</Button>*/}
            </div>
        );
    }
}