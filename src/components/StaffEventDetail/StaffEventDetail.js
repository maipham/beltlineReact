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

    render() {
        return (
            <Grid container>
                <Grid md={12}>
                    <h1>Staff Event Detail</h1>
                </Grid>
                <Grid md={6}>
                    <strong> Event: </strong>
                    {this.state.event.name}
                </Grid>
                <Grid md={6}>
                    <strong> Site: </strong>
                    {this.state.event.site}
                </Grid>
                <Grid md={6}>
                    <strong>
                        Start Date:
                    </strong>
                    {this.state.event.startDate}
                </Grid>
                <Grid md={6}>
                    <strong>
                        End Date:
                    </strong>
                    {this.state.event.endDate}
                </Grid>
                <Grid md={4}>
                    <strong>
                        Staffs:
                    </strong>
                        {
                            this.state.event.schedule.map(staff => (
                                <div>
                                    <strong>{staff}</strong>
                                </div>
                            ))
                        }
                </Grid>
                <Grid md={4}>
                    <strong>
                        Capacity:
                    </strong>
                    {this.state.event.capacity}
                </Grid>
                <Grid md={4}>
                    <strong>
                        Price:
                    </strong>
                    {this.state.event.ticketPrice}
                </Grid>
                <Grid md={6}>
                    <strong>
                        Description:
                    </strong>
                    {this.state.event.description}
                </Grid>
                <Grid md={12}>
                    <Button color={"primary"} variant={"raised"} onClick={this.back}>Back</Button>
                </Grid>
            </Grid>
        );
    }
}
