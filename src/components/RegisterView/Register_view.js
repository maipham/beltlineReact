import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


export class Register_view extends Component {
    constructor(props) {
        super(props);
        
        this.state= {firstname: '',
                    lastname: '',
                    username: '',
                    usertype: '',
                    password: '',
                    confirmpass: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    email: '',
                    emails: []};
    }
    render() {
        const userTypeOptions = {item1: <MenuItem></MenuItem>};
        return (
            <div>
                <h1>Register</h1>
                <InputLabel>First Name</InputLabel>
                <Input placeholder="First Name"/>

                <InputLabel>Last Name</InputLabel>
                <Input placeholder="Last Name" />
                <br />

                <InputLabel>Username</InputLabel>
                <Input placeholder="Username" />
                <Menu />
                <br />

                <InputLabel>Password</InputLabel>
                <Input placeholder="Password" type="password"/>
                <InputLabel>Confirm Password</InputLabel>
                <Input placeholder="Confirm Password" type="password"/>
                <br />

                <InputLabel>Phone</InputLabel>
                <Input placeholder="Phone" />
                <InputLabel>Address</InputLabel>
                <Input placeholder="Address" />
                <br />

                <InputLabel>City</InputLabel>
                <Input placeholder="City"/>

                <InputLabel>Zipcode</InputLabel>
                <Input placeholder="Zipcode"/>
            </div>
        );
    }
}