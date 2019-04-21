
import React, { Component } from 'react';
import './FunctionalityView.css';
import Button from "@material-ui/core/es/Button/Button";
import {view_options} from "../../entities/ViewOptions";
import Grid from "@material-ui/core/Grid";
import {BrowserRouter as Router, Route, Redirect, Link} from "react-router-dom";
import {VisitHistory} from "../VisitHistory/VisitHistory";

export default class FunctionalityView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            view_options: view_options

        };
    }

    navigateTo(url) {

    }

    render() {
        const styles = {
            width: 100 + 'vw',
            height: 100 + 'vh',
            // backgroundColor: '#8c9eff',
            // fontSize: this._textSize + 'px',
            // fontFamily: 'Quicksand, sans-serif'
        };
        const button = {
            width: '200px'
        };

        const item = {
            width: 'fit-content'
        };
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Functionality</h1></Grid>
                <Grid container={true}
                      justify='center'
                      spacing={16}>
                    {this.state.view_options.map((opt, i) => {
                        return <Grid key={i} item={true} container justify='center' style={item} xs={4}>
                            <Button variant="contained" style={button} component={Link} to={opt.opt[1]}>{opt.opt[0]}</Button>
                        </Grid>
                    })}
                </Grid>
            </div>
        );
    }
}
