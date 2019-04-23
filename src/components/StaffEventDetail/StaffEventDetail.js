import React, {Component} from 'react';
import './StaffEventDetail.css';
import {event_detail} from "../../mocks/event-detail-mock";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default class StaffEventDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: event_detail
        };
    };
    back = (e) => {
        console.log("Back");
    }

    // componentDidMount() {
    //     this.hr.open('GET');
    //     this.hr.onreadystatechange = (event) => {
    //         if (event.target.readyState === 4 && event.target.status === 200) {
    //             const data = JSON.parse(event.target.responseText);
    //             if (data.length > 0) {
    //                 let a = [];
    //                 data[1].forEach(function(element) {
    //                     a.push(element.name);
    //                 });
    //
    //                 this.setState({
    //                     historyObjects: data[0],
    //                     filteredHistory: data[0],
    //                     siteNames: a
    //                 });
    //             }
    //         }
    //     };
    //
    //     this.hr.send();
    // }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <h1>Staff Event Detail</h1>
                </Grid>
                <Grid item xs={6}>
                    <strong> Event: </strong>
                    {this.state.event.name}
                </Grid>
                <Grid item xs={6}>
                    <strong> Site: </strong>
                    {this.state.event.site}
                </Grid>
                <Grid item xs={6}>
                    <strong>
                        Start Date:
                    </strong>
                    {this.state.event.startDate}
                </Grid>
                <Grid item xs={6}>
                    <strong>
                        End Date:
                    </strong>
                    {this.state.event.endDate}
                </Grid>
                <Grid item xs={4}>
                    <strong>
                        Staffs:
                    </strong>
                        {
                            this.state.event.staffs.map(staff => (
                                <div>
                                    <strong>{staff}</strong>
                                </div>
                            ))
                        }
                </Grid>
                <Grid item xs={4}>
                    <strong>
                        Capacity:
                    </strong>
                    {this.state.event.capacity}
                </Grid>
                <Grid item xs={4}>
                    <strong>
                        Price:
                    </strong>
                    {this.state.event.ticketPrice}
                </Grid>
                <Grid item xs={6}>
                    <strong>
                        Description:
                    </strong>
                    {this.state.event.description}
                </Grid>
                <Grid item xs={12}>
                    <Button color={"primary"} variant={"raised"} onClick={this.back}>Back</Button>
                </Grid>
            </Grid>
        );
    }
}
