import React, { Component } from 'react';
import { Button } from './Button.js';

export class VisitHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            siteName: '',
            startDate: '',
            endDate: ''
        };

        this.handleEventChange = this.handleEventChange.bind(this);
        this.handleSiteChange = this.handleSiteChange.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.filterAndGetInfo = this.filterAndGetInfo.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleEventChange(event) {
        this.setState({eventName: event.target.value});
    }

    handleSiteChange(event) {
        this.setState({siteName: event.target.value});
    }

    handleStartDateChange (event) {
        this.setState({startDate: event.target.value});
    }

    handleEndDateChange (event) {
        this.setState({endDate: event.target.value});
    }

    filterAndGetInfo(event) {
        console.log("" + this.state.value);
    }

    registerUser(event) {
        console.log(this.state.password);
    }

    render() {
        return (
            <div>
                <h1>Visit History</h1>
                <form>
                    <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Event</label>
                    <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.value} onChange={this.handleUserChange}></input>
                    <br/>
                    <br/>
                    <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Password</label>
                    <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.password} onChange={this.handlePasswordChange}></input>
                    <br />
                </form>
                <br />
                <Button type="button" text="Login" buttonSize="sButton" onClick={this.sendUserInfo} float="fleft"/>
                <Button type="button" text="Register" buttonSize="sButton" onClick={this.registerUser} float="fright"/>
            </div>
        );
    }
}