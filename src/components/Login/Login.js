import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import LoginForm from "../forms/LoginForm/LoginForm";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            password: ''
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
            console.log(e);
            if (e.target.readyState === 4 && e.target.status === 200) {
                const response = JSON.parse(e.target.responseText);
                console.log(response);
            }
        };
        hr.send();
    };


    render() {
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Login</h1></Grid>
                <LoginForm onSubmit={this.handleLogin}/>
            </div>
        );
    }
}