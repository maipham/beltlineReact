import React, { Component } from 'react';
import { Button } from './Button.js';

export class RegistrationNav extends Component {
    render() {
        return (
            <div>
                <Button text="User Only" type="button" className="mButton regButton"/> <br />
                <Button text="Visitor Only" type="button" className="mButton regButton"/> <br />
                <Button text="Employee Only" type="button" className="mButton"/> <br />
                <Button text="Employee Visitor" type="button" className="mButton"/> <br />
                <Button text="Back" type="button" className="mButton"/>
            </div>
        )
    }
}