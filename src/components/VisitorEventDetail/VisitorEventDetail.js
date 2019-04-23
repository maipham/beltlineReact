import React, {Component} from 'react';
import './VisitorEventDetail.css';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {event_detail} from "../../mocks/event-detail-mock";

export default class VisitorEventDetail extends Component {
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
            <Grid container justify="center">
                <Grid item xs={12}>
                    <h1>Visitor Event Detail</h1>
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong> Event: </strong>
                    {this.state.event.name}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong> Site: </strong>
                    {this.state.event.site}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        Start Date:
                    </strong>
                    {this.state.event.startDate}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        End Date:
                    </strong>
                    {this.state.event.endDate}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        Price:
                    </strong>
                    {this.state.event.ticketPrice}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        Ticket Remains:
                    </strong>
                    {this.state.event.ticketsRemain}
                </Grid>

                <Grid item container justify="center" xs={6}>
                    <strong>
                        Description:
                    </strong>
                    {this.state.event.description}
                </Grid>
                <Grid item container justify="center" xs={12}>
                    <InputLabel style={{marginRight: '15px'}}>Visit Date</InputLabel>
                    <TextField id="visitDate"
                               type="date"
                               defaultValue={this.state.event.visitDate}
                               value={this.state.event.visitDate}
                               InputLabelProps={{shrink: true}}
                               style={{width: '145px'}} onChange={this.handleVisitDate}/>

                    <Button color={"primary"} variant={"raised"} onClick={this.logVisit}>Log Visit</Button>
                </Grid>
                <Grid item container justify="center" xs={12}>
                    <Button color={"primary"} variant={"raised"} onClick={this.back}>Back</Button>
                </Grid>
            </Grid>
        );
    }

    handleVisitDate = (e) => {
        console.log("Visit Date Change");
        console.log(e.target.value);
        this.state.event.visitDate = e.target.value;
        this.setState(this.state);
    };

    logVisit = (e) => {
        const visit_date = this.state.event.visitDate;
        console.log("Log Visit");
        console.log(visit_date);
    };
}

