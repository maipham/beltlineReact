import React, {Component} from 'react';
import {User} from "../../entities/User";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {RegisterForm} from "../forms/RegisterForm/RegisterForm";
import {user_type} from "../../entities/constants";
import {Visitor} from "../../entities/Visitor";
import {Employee} from "../../entities/Employee";

const us_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
    'WI', 'WY'];

export class Register_view extends Component {
    isEmployee = false;
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            anchorEl: null,
            andhorEl2: null,
            usertype: "Manager",
            curr_state: "AL",
        };
        this.initUser(props.location.hash);
    }

    initUser(hash) {
        switch (hash) {
            case '#user':
                this.state.user = new User();
                this.state.usertype = user_type.USER;
                break;
            case '#visitor':
                this.state.user = new Visitor();
                this.state.usertype = user_type.VISITOR;
                break;
            case '#employee-visitor':
                this.state.user = new Employee(null,null,null, null,null,null,user_type.EMP_VIS,
                    null, true, null,null);
                this.isEmployee = true;
                break;
            case '#employee':
                this.state.user = new Employee(null,null,null, null,null,null,user_type.EMP,
                    null, false, null,null);
                this.isEmployee = true;
                break;
        }
    }

    handleTypeClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = (event, value) => {
        this.setState({
            anchorEl: null,
            anchorEl2: null
        });
    };

    handleMenuClick = (event) => {
        this.setState({
            anchorEl: null,
            usertype: event.target.innerText
        });
    };

    handleStateClick = event => {
        this.setState({anchorEl2: event.currentTarget});
    };

    handleStateClose = (event, value) => {
        this.setState({anchorEl2: null});
    };

    handleStateMenuClick = (event) => {
        this.setState({
            anchorEl2: null,
            curr_state: event.target.innerText
        });
    };

    handleReset = () => {
        this.loginForm.reset();
    };

    handleSubmit = (e) => {
        console.log(e);
        console.log(e['email']);

        // this.state.user = new User(e.username, e.email, e.password);
    };

    render() {
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Register User</h1></Grid>
                <RegisterForm onSubmit={this.handleSubmit} handleTypeClick={this.handleTypeClick} isEmployee={this.isEmployee}
                              handleClose={this.handleClose} handleMenuClick={this.handleMenuClick}
                              anchorEl={this.state.anchorEl} userType={this.state.usertype}
                              anchorEl2={this.state.anchorEl2} states={us_states}
                              handleStateClick={this.handleStateClick} handleStateMenuClick={this.handleStateMenuClick}
                              curr_state={this.state.curr_state}/>
            </div>
        );
    }
}

