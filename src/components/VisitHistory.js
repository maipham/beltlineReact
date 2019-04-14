import React, { Component } from 'react';
import { Button } from './Button/Button.js';
import {User} from "../entities/User";
import {Employee} from "../entities/Employee";

export class VisitHistory extends Component {
    user = new User('maipham', 'maipham@gmail.com', 'mai',);
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
                VisitHistory works!
                <h1>{ this.user.email }</h1>
            </div>
        );
    }
}