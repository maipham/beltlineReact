import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import LoginForm from "../forms/LoginForm/LoginForm";
import {response_messages, user_type} from "../../entities/constants";
import {BrowserRouter, Link, Route} from "react-router-dom";
import FunctionalityView from "../FunctionalityView/FunctionalityView";

export class Login extends Component {
    auth = false;

    constructor(props) {
        super(props);
        this.state = {
            signIn_sucess: false,
            user_type: null
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
                const message = response.message;
                const user_type = response.user_type;
                console.log(message);
                if (message === response_messages.account_exists) {
                    this.setState(
                        {
                            signIn_sucess: true,
                            user_type: user_type
                        }
                    );
                    return (

                    )
                }
            }
        };
        hr.send();
    };


    render() {
        const {signIn_success} = this.state;
        return (
            <div>
                {signIn_success ?
                    <Route path="/functionality" render={FunctionalityView}/>:
                    <div>
                        <Grid container justify="center" item xs={12}><h1>Login</h1></Grid>
                        <LoginForm onSubmit={this.handleLogin}/>
                    </div>
                }
            </div>
        );
    }
}