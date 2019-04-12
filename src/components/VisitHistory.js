import React, { Component } from 'react';
import { Button } from './Button/Button.js';

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
                <form style={{float: "left", width: 425}}>
                    <span>
                        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Event</label>
                        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.eventName} onChange={this.handleEventChange}></input>

                        <br/>
                        <br/>

                        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Start Date</label>
                        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.startDate} onChange={this.handleStartDateChange}></input>
                        <br />
                    </span>
                </form>

                <form style={{float: "left", width: 425}}>
                    <span>
                        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Site</label>
                        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.siteName} onChange={this.handleSiteChange}></input>

                        <br/>
                        <br/>

                        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>End Date</label>
                        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.endDate} onChange={this.handleEndDateChange}></input>
                        <br />
                    </span>
                </form>

                <br />
                <Button type="button" text="Filter" onClick={this.filterAndGetInfo} className="mButton moreVerticalSpace"/>

                <br />
                <table cellSpacing={"15"} align={"center"} border={"1"} bordercolor={"white"}>
                    <tr>
                        <th>Date</th>
                        <th>Event</th>
                        <th>Site</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        );
    }
}