import React, {Component} from 'react';
import './VisitorEventDetail.css';
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {event_detail} from "../../mocks/event-detail-mock";

export default class VisitorEventDetail extends Component {
    hr = new XMLHttpRequest();
    constructor(props) {
        super(props);
        this.state = {
            event: event_detail,
            description: '',
            end_date: '',
            username: ''
        };

    };

    back = (e) => {
        console.log("Back");
    }

    componentDidMount() {
        console.log(this.props);
        console.log(this.props.location);
        let site = 'http://localhost:5000/v_event_detail?event_name=' + this.props.location.state.event_name + '&site_name='
            + this.props.location.state.site_name + '&start_date=' + this.props.location.state.start_date;
        this.hr.open('GET', site);
        console.log(site);
        this.hr.onreadystatechange = (event) => {
            if (event.target.readyState === 4 && event.target.status === 200) {
                const data = JSON.parse(event.target.responseText);
                this.setState({
                    address: data[0].address,
                    zipcode: data[0].zipcode,
                    description: data[0].description,
                    end_date: data[0].end_date,
                    username: this.props.location.state.username,
                    site_name: this.props.location.state.site_name,
                    start_date: this.props.location.state.start_date,
                    event_name : this.props.location.state.event_name
                })

            }
        };

        this.hr.send();
    }

    logVisit = (e) => {
        const body = {
            'username': this.state.username,
            'event_name': this.state.event_name,
            'site_name': this.state.site_name,
            'event_start': this.state.start_date,
            'visit_date': this.state.event.visitDate
        };
        this.hr.open('POST', 'http://localhost:5000/v_event_detail');
        this.hr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.hr.onreadystatechange = (e) => {
            if (e.target.readyState === 4 && e.target.status === 200) {
                console.log('log sucess');
            }
        };
        this.hr.send(JSON.stringify(body));
    };

    render() {
        return (
            <Grid container justify="center">
                <Grid item xs={12}>
                    <h1>Visitor Event Detail</h1>
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong> Event: </strong>
                    {this.props.location.state.event_name}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong> Site: </strong>
                    {this.props.location.state.site_name}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        Start Date:
                    </strong>
                    {this.props.location.state.start_date}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        End Date:
                    </strong>
                    {this.state.end_date}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        Price:
                    </strong>
                    {this.props.location.state.price}
                </Grid>
                <Grid item container justify="center" xs={6}>
                    <strong>
                        Ticket Remains:
                    </strong>
                    {this.props.location.state.remaining}
                </Grid>

                <Grid item container justify="center" xs={6}>
                    <strong>
                        Description:
                    </strong>
                    {this.state.description}
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

}

