import React, { Component } from 'react';
import Grid from "@material-ui/core/Grid";
import FormLabel from '@material-ui/core/FormLabel';
import {SiteDetailObject} from "../../entities/SiteDetailObject";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const date = new Date().getDate();
var testSite = [new SiteDetailObject("Inman Park", "Yes", "Inman Park, Atlanta, GA 30307")];

export class SiteDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visitDate: date
        }


    }

    handleDateChange = (event) => {
        this.setState({visitDate: event.target.value});
        console.log("Changed date to " + event.target.value);
    }

    handleLogVisit = (event) => {
        console.log("Logged a visit!");
    }

    handleGoBack = (event) => {
        console.log("Let's go back!");
    }

    render() {
        return (
            <div>
                {/*Container for the header*/}
                <Grid container justify="center">
                    <Grid item>
                        <h1>Site Detail</h1>
                    </Grid>
                </Grid>

                <Grid container justify="center">
                    <Grid item>
                        <TableHead>
                            <TableCell align="right">Site</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Open Every Day</TableCell>
                        </TableHead>
                        <TableBody>
                            {testSite.map((detail, i) => {
                                return (<TableRow hover
                                                  key={i}>
                                    <TableCell align="right">{detail.site}</TableCell>
                                    <TableCell align="right">{detail.address}</TableCell>
                                    <TableCell align="right">{detail.openEveryday}</TableCell>
                                </TableRow>);
                            })}
                        </TableBody>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '25px'}}>
                    <Grid item>
                        <InputLabel style={{paddingRight: '10px', marginTop: '50px'}}>Start Date</InputLabel>
                        <TextField id="visitdate"
                                   type="date"
                                   defaultValue={date}
                                   InputLabelProps={{shrink: true}}
                                   style={{width: '145px'}} onChange={this.handleDateChange}/>
                    </Grid>

                    <Grid item>
                        <Button style={{marginLeft: '25px'}}color='primary' variant='contained' onClick= {this.handleLogVisit}>Log Visit</Button>
                    </Grid>
                </Grid>

                <Grid container justify="center" style={{marginTop: '25px'}}>
                    <Button color={'primary'} variant='contained' onClick = {this.handleGoBack}>Back</Button>
                </Grid>
            </div>
        )
    }
}