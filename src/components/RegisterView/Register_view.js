import React, {Component} from 'react';
import {User} from "../../entities/User";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {RegisterForm} from "../forms/RegisterForm/RegisterForm";
import {user_type} from "../../entities/constants";
import {Visitor} from "../../entities/Visitor";
import {Employee} from "../../entities/Employee";


export class Register_view extends Component {
    constructor(props) {
        super(props);
        console.log("this is props from view");
        console.log(props.location.hash);
        this.state = {
            user: null,
            anchorEl: null,
            andhorEl2: null,
            usertype: null,
            curr_state: "AL",
        };
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
                this.state.user = new Employee();
                this.state.user.is_visitor(true);
                this.state.usertype = user_type.EMP_VIS;
                break;
            case '#employee':
                this.state.user = new Employee();
                this.state.usertype = user_type.EMP;
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
        // console.log(e['email']);
    };

    handleAddEmail = (e) => {
        console.log("from register view");
        console.log(e);
    };

    render() {
        return (
            <div>
                <Grid container justify="center" item xs={12}><h1>Register User</h1></Grid>
                <RegisterForm onSubmit={this.handleSubmit} handleTypeClick={this.handleTypeClick}
                              user={this.state.user}
                              handleClose={this.handleClose} handleMenuClick={this.handleMenuClick}
                              anchorEl={this.state.anchorEl} userType={this.state.usertype}
                              anchorEl2={this.state.anchorEl2} addEmail={this.handleAddEmail}
                              handleStateClick={this.handleStateClick} handleStateMenuClick={this.handleStateMenuClick}
                              curr_state={this.state.curr_state}/>
            </div>
        );
    }
}

