import React, { Component } from 'react';
import { Button } from './Button.js';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '',
                      password: ''};

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.sendUserInfo = this.sendUserInfo.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleUserChange(event) {
        this.setState({value: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    sendUserInfo(event) {
        console.log(this.state.value);
    }

    registerUser(event) {
        console.log(this.state.password);
    }

    render() {
        return (
            <div>
                <h1>Atlanta Beltline Login</h1>
                <form>
                    <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Email</label>
                    <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.value} onChange={this.handleUserChange}></input> 
                    <br/>
                    <br/>
                    <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Password</label>
                    <input style={{display: "inline-block", float: "left", padding: 5}} type="password" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <br />
                </form>
                <br />
                <Button type="button" text="Login" buttonSize="sButton" onClick={this.sendUserInfo} float="fleft"/>
                <Button type="button" text="Register" buttonSize="sButton" onClick={this.registerUser} float="fright"/>
            </div>
        );
    }
}