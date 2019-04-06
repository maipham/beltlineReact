import React, { Component } from 'react';
import { Button } from './Button.js';

export class RegistrationNav extends Component {
    render() {
        return (
            <div>
                <h1>Registration Navagation</h1>
                <Button text="User Only" type="button" className="mButton regButton"/> <br />
                <Button text="Visitor Only" type="button" className="mButton regButton"/> <br />
                <Button text="Employee Only" type="button" className="mButton regButton"/> <br />
                <Button text="Employee Visitor" type="button" className="mButton regButton"/> <br />
                <Button text="Back" type="button" className="mButton regButton"/>
            </div>
        )
    }
}