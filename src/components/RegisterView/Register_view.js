import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';


export class Register_view extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef();
        this.state={firstname: '',
                    lastname: '',
                    username: '',
                    usertype: 'Manager',
                    password: '',
                    confirmpass: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    zipcode: '',
                    email: '',
                    emails: [],
                    anchorEl: null,
                    counter: 0
                };
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose = (event, value) => {
        this.setState({ anchorEl: null});
    };

    handleMenuClick = (event) => {
        this.setState({anchorEl: null,
        usertype: event.target.innerText});
    }

    handleEmailAdd = () => {
        let emailList = this.state.emails;
        emailList.push({emailentry: this.state.email,
                        id: this.state.counter});
        this.setState({emails: emailList,
                        counter: ++this.state.counter,
                        email: ' '});
        this.emailRef.current.value = '';
    }

    handleEmailDelete = id => {
        return () => {
            this.setState({
                emails: this.state.emails.filter((email) => email.id !== id)
            });
        }
    }

    render() {
        const { anchorEl } = this.state;
        return (
            <div>
                <h1 style={styles.textColor}>Register</h1>
                <InputLabel >First Name</InputLabel>
                <Input placeholder="First Name" onChange={(event) => this.setState({firstname: event.target.value})}/>

                <InputLabel>Last Name</InputLabel>
                <Input placeholder="Last Name" onChange={(event) => this.setState({lastname: event.target.value})}/>
                <br />

                <InputLabel style ={styles.inputTitle}>Username</InputLabel>
                <Input placeholder="Username" />
                <InputLabel>User Type</InputLabel>
                <Button aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}>{this.state.usertype}</Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >       
                    <MenuItem onClick={this.handleMenuClick} value="Manager">Manager</MenuItem>
                    <MenuItem onClick={this.handleMenuClick} value="Staff">Staff</MenuItem>
                </Menu>
                
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

                <div>
                    <InputLabel>Emails</InputLabel>
                    <List dense>
                        {this.state.emails.map(value => (
                            <ListItem key={value.id}>
                                <ListItemText primary={value.emailentry}/>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={this.handleEmailDelete(value.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                    <Input inputRef={this.emailRef} placeholder="Email" onChange={(event) => this.setState({email: event.target.value})}/>

                    <Button variant="outlined" onClick={this.handleEmailAdd}>
                        Add
                    </Button>
                </div>
            </div>
        );
    }
}

const styles = {
    inputTitle: {
        height: '200PX'
    },
    inputSpace: {
        vertical_align: 'left'
    },
    textColor: {
        color: "black"
    }
}