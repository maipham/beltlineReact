
import React, {Component} from 'react';
import {User} from "../../entities/User";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {RegisterForm} from "../forms/RegisterForm/RegisterForm";

const us_states = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID',
    'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS',
    'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
    'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV',
    'WI', 'WY'];

export class Register_view extends Component {


    constructor(props) {
        super(props);
        this.state = {
            user: new User(),
            anchorEl: null,
            andhorEl2: null,
            usertype: "Manager",
            curr_state: "AL",
        };
    }

    handleTypeClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = (event, value) => {
        this.setState({anchorEl: null,
                             anchorEl2: null});
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
                <RegisterForm onSubmit={this.handleSubmit} handleTypeClick={this.handleTypeClick}
                              handleClose={this.handleClose} handleMenuClick={this.handleMenuClick}
                              anchorEl={this.state.anchorEl} userType={this.state.usertype}
                              anchorEl2={this.state.anchorEl2} states={us_states}
                              handleStateClick={this.handleStateClick} handleStateMenuClick={this.handleStateMenuClick}
                              curr_state={this.state.curr_state}/>


                {/*<FieldGroup control={this.register_form}>*/}
                {/*<InputLabel>First Name</InputLabel>*/}
                {/*</FieldGroup>*/}
                {/*<FieldControl name="username" render={input} meta={{ label: "Username" }}/>*/}
                {/* <Input placeholder="First Name" onChange={(event) => this.setState({firstname: event.target.value})}/>

                    <InputLabel>Last Name</InputLabel>
                    <Input placeholder="Last Name" onChange={(event) => this.setState({lastname: event.target.value})}/>
                    <br />

                    <InputLabel style ={styles.inputTitle}>Username</InputLabel>

    //                 <Input placeholder="Username"/>
    //                 <InputLabel>User Type</InputLabel>
    //                 <Button aria-owns={anchorEl ? 'simple-menu' : undefined}
    //                     aria-haspopup="true"
    //                     onClick={this.handleTypeClick}>{this.state.usertype}</Button>
    //                 <Menu
    //                     id="simple-menu"
    //                     anchorEl={anchorEl}
    //                     open={Boolean(anchorEl)}
    //                     onClose={this.handleClose}
    //                 >       
    //                     <MenuItem onClick={this.handleMenuClick} value="Manager">Manager</MenuItem>
    //                     <MenuItem onClick={this.handleMenuClick} value="Staff">Staff</MenuItem>
    //                 </Menu>
                    
    //                 <br />

    //                 <InputLabel>Password</InputLabel>
    //                 <Input placeholder="Password" type="password"/>
    //                 <InputLabel>Confirm Password</InputLabel>
    //                 <Input placeholder="Confirm Password" type="password"/>
    //                 <br />

    //                 <InputLabel>Phone</InputLabel>
    //                 <Input placeholder="Phone" />
    //                 <InputLabel>Address</InputLabel>
    //                 <Input placeholder="Address" />
    //                 <br />

    //                 <InputLabel>City</InputLabel>
    //                 <Input placeholder="City"/>

    //                 <InputLabel>State</InputLabel>
    //                 <Button aria-owns={anchorEl ? 'state-menu' : undefined}
    //                     aria-haspopup="true"
    //                     onClick={this.handleStateClick}>{this.state.us_state}</Button>
    //                 <Menu
    //                     id="state-menu"
    //                     anchorEl={anchorEl2}
    //                     open={Boolean(anchorEl2)}
    //                     onClose={this.handleStateClose}
    //                 >
    //                     {us_states.map(us_state => (
    //                         <MenuItem onClick={this.handleStateMenuClick} value={us_state}>{us_state}</MenuItem>
    //                     ))}
    //                 </Menu>

    //                 <InputLabel>Zipcode</InputLabel>
    //                 <Input placeholder="Zipcode"/>

    //                 <div>
    //                     <InputLabel>Emails</InputLabel>
    //                     <List dense>
    //                         {this.state.emails.map(value => (
    //                             <ListItem key={value.id}>
    //                                 <ListItemText primary={value.emailentry}/>
    //                                 <ListItemSecondaryAction>
    //                                     <IconButton aria-label="Delete" onClick={this.handleEmailDelete(value.id)}>
    //                                         <DeleteIcon />
    //                                     </IconButton>
    //                                 </ListItemSecondaryAction>
    //                             </ListItem>
    //                         ))}
    //                     </List>
    //                     <Input inputRef={this.emailRef} placeholder="Email" onChange={(event) => this.setState({email: event.target.value})}/>
                
    //             </FieldGroup>
                

    //                 <Button variant="outlined" onClick={this.handleEmailAdd}>
    //                     Add
    //                 </Button>
    //             </div>
    //         </div>
    //     );
    // }

}
}

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
                        <Input inputRef={this.emailRef} placeholder="Email" onChange={(event) => this.setState({email: event.target.value})}/> */}

                {/*</FieldGroup>*/}


                {/*<Button variant="outlined" onClick={this.handleEmailAdd}>*/}
                {/*Add*/}
                {/*</Button>*/}
                {/* </div> */}
            </div>
        );
    }
}

