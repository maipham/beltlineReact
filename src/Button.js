import React from 'react';
import './Button.css';

export const Button = ({text, type, disabled, onClick, style, className}) => (<button
                                                        type={type}
                                                        disabled={disabled}
                                                        onClick={onClick}
                                                        className={"Button " + className}
                                                        style={style}>{text}</button>);