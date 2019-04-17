import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormControl, FormBuilder, Validators, FieldGroup, FieldControl } from 'react-reactive-form';

const us_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI' ,'ID',
                    'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
                    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
                    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
                    'WI', 'WY'];

const input = ({ handler, touched, hasError, meta }) => (
                        <div>
                          <input placeholder={`Enter ${meta.label}`}/>
                          {/* <span>
                              {touched
                              && hasError("required")
                              && `${meta.label} is required`}
                          </span> */}
                        </div>  
                      );
export class Register_view extends Component {
    register_form = new FormBuilder.group({
        username: ["", Validators.required]
    });

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
                    us_state: 'AL',
                    zipcode: '',
                    email: '',
                    emails: [],
                    anchorEl: null,
                    anchorEl2: null,
                    counter: 0
                };
    }

    handleTypeClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    }
    
    handleClose = (event, value) => {
        this.setState({ anchorEl: null});
    };

    handleMenuClick = (event) => {
        this.setState({anchorEl: null,
        usertype: event.target.innerText});
    }

    handleStateClick = event => {
        this.setState({ anchorEl2: event.currentTarget });
    }
    
    handleStateClose = (event, value) => {
        this.setState({ anchorEl2: null});
    };

    handleStateMenuClick = (event) => {
        this.setState({anchorEl2: null,
        us_state: event.target.innerText});
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
        const { anchorEl2 } = this.state;
        
        return (
            <div>
                <h1 style={styles.textColor}>Register</h1>
                <FieldGroup control={this.register_form}>
                    <InputLabel style={{...styles.spacing}}>First Name</InputLabel>
                    <FieldControl name="username" render={input} meta={{ label: "Username" }}/>
                    <Input placeholder="First Name" onChange={(event) => this.setState({firstname: event.target.value})}/>

                    <InputLabel>Last Name</InputLabel>
                    <Input placeholder="Last Name" onChange={(event) => this.setState({lastname: event.target.value})}/>
                    <br />

                    <InputLabel style ={styles.inputTitle}>Username</InputLabel>
                    
                    <Input placeholder="Username"/>
                    <InputLabel>User Type</InputLabel>
                    <Button aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleTypeClick}>{this.state.usertype}</Button>
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

                    <InputLabel>State</InputLabel>
                    <Button aria-owns={anchorEl ? 'state-menu' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleStateClick}>{this.state.us_state}</Button>
                    <Menu
                        id="state-menu"
                        anchorEl={anchorEl2}
                        open={Boolean(anchorEl2)}
                        onClose={this.handleStateClose}
                    >
                        {us_states.map(us_state => (
                            <MenuItem onClick={this.handleStateMenuClick} value={us_state}>{us_state}</MenuItem>
                        ))}
                    </Menu>

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
                
                </FieldGroup>
                

                    <Button variant="outlined" onClick={this.handleEmailAdd}>
                        Add
                    </Button>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });