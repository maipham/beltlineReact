import React, {Component} from 'react';
import './StaffEventDetail.css';
import {event_detail} from "../../mocks/event-detail-mock";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

export default class StaffEventDetail extends Component {
    hr = new XMLHttpRequest();

    constructor(props) {
        super(props);
        this.state = {
            event: event_detail,
            staffs: []
        };
    };

    back = (e) => {
        console.log("Back");
    }

    componentDidMount() {
        // console.log(this.props.location.state);
        const event_name = this.props.location.state.event.event_name;
        const site_name = this.props.location.state.event.site_name;
        const start_date = this.props.location.state.event.start_date;
        this.hr.open('GET',
            'http://localhost:5000/s_event_detail?event_name=' + event_name
            + '&site_name=' + site_name
            + '&start_date=' + start_date);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                this.state.event = data[0];
                this.state.staffs = data[0].staff_assigned;
                this.setState(this.state);
                console.log(data[0]);
            }
        };

        this.hr.send();
    }

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <h1>Staff Event Detail</h1>
                </Grid>
                <Grid item xs={6}>
                    <strong> Event: </strong>
                    {this.state.event.event}
                </Grid>
                <Grid item xs={6}>
                    <strong> Site: </strong>
                    {this.state.event.site}
                </Grid>
                <Grid item xs={6}>
                    <strong>
                        Start Date:
                    </strong>
                    {this.state.event.start_date}
                </Grid>
                <Grid item xs={6}>
                    <strong>
                        End Date:
                    </strong>
                    {this.state.event.end_date}
                </Grid>
                <Grid item xs={4}>
                    <strong>
                        Staffs:
                    </strong>
                    {
                        this.state.staffs.map((staff) => {
                            return (
                                <div>
                                    <strong>{staff}</strong>
                                </div>
                            )
                        })
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
                    {this.state.event.ticket_price}
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
