import React, {Component} from 'react';
import './RegisterNav.css';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

export default class RegisterNav extends Component {
    constructor(props) {
        super(props);
    };

    reg_op = [
        ['User Only', 'user'],
        ['Visitor Only', 'visitor'],
        ['Employee Only', 'employee'],
        ['Employee-Visitor', 'employee-visitor']
    ];

    render() {
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Register Navigation</h1></Grid>
                <Grid container={true}
                      justify='center'
                      spacing={16}>
                    {this.reg_op.map((opt, i) => {
                        return <Grid key={i} item={true} container justify='center' xs={8}>
                            <Button variant="outlined" component={Link} to={{
                                pathname: '/register', hash: opt[1]
                            }}>{opt[0]}</Button>
                        </Grid>
                    })}
                </Grid>
            </div>
        );
    }
}
