import React from 'react';
import './Button.css';

export const Button = ({text, type, disabled, onClick, buttonSize, float}) => (<button
                                                        type={type}
                                                        disabled={disabled}
                                                        onClick={onClick}
                                                        className={"Button " + buttonSize + " " + float}>{text}</button>);