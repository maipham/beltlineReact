import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import TextField from '@material-ui/core/TextField/index';
import Button from '@material-ui/core/Button/index';
import GridList from "@material-ui/core/es/GridList/GridList";
import Grid from "@material-ui/core/Grid";
// import GridList from "@material-ui/core/es/GridList/GridList";

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

export class VisitHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            siteName: '',
            startDate: '',
            endDate: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.filterAndGetInfo = this.filterAndGetInfo.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleChange = name => event => {
        console.log("Tried to change " + name);
        this.setState({ [name]: event.target.value });
    };

    filterAndGetInfo(event) {
        console.log("" + this.state.eventName);
    }

    registerUser(event) {
        console.log("" + this.state.password);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <h1>Visit History</h1>
                <Grid container={true} justify={'center'}>
                    <Grid item={true}>
                        <form noValidate autoComplete="off">
                            <TextField
                                id="standard-eventName"
                                label="Event"
                                // className={classes.textField}
                                value={this.state.eventName}
                                onChange={this.handleChange('eventName')}
                                margin="normal"
                            />
                        </form>


                    </Grid>
                </Grid>


                {/*<form style={{float: "left", width: 425}}>*/}
                {/*    <span>*/}
                {/*        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Event</label>*/}
                {/*        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.eventName} onChange={this.handleChange('eventName')}></input>*/}

                {/*        <br/>*/}
                {/*        <br/>*/}

                {/*        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Start Date</label>*/}
                {/*        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.startDate} onChange={this.handleChange('startDate')}></input>*/}
                {/*        <br />*/}
                {/*    </span>*/}
                {/*</form>*/}

                {/*<form style={{float: "left", width: 425}}>*/}
                {/*    <span>*/}
                {/*        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>Site</label>*/}
                {/*        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.siteName} onChange={this.handleChange('siteName')}></input>*/}

                {/*        <br/>*/}
                {/*        <br/>*/}

                {/*        <label style={{display: "inline-block", float: "left", clear: "left", width: 250}}>End Date</label>*/}
                {/*        <input style={{display: "inline-block", float: "left", padding: 5}} type="text" value={this.state.endDate} onChange={this.handleChange('endDate')}></input>*/}
                {/*        <br />*/}
                {/*    </span>*/}
                {/*</form>*/}

                {/*<br />*/}
                {/*<Button type="button" text="Filter" onClick={this.filterAndGetInfo} className="mButton moreVerticalSpace"/>*/}

                {/*<br />*/}
                {/*<table cellSpacing={"15"} align={"center"} border={"1"} bordercolor={"white"}>*/}
                {/*    <tr>*/}
                {/*        <th>Date</th>*/}
                {/*        <th>Event</th>*/}
                {/*        <th>Site</th>*/}
                {/*        <th>Price</th>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td></td>*/}
                {/*        <td></td>*/}
                {/*        <td></td>*/}
                {/*        <td></td>*/}
                {/*    </tr>*/}
                {/*    <tr>*/}
                {/*        <td></td>*/}
                {/*        <td></td>*/}
                {/*        <td></td>*/}
                {/*        <td></td>*/}
                {/*    </tr>*/}
                {/*</table>*/}
            </div>
        );
    }
}