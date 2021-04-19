import React from 'react';
import './Button.css';

const Button = ({label, type}) => {
    return (
        <button className="Button" type={type}>
            {label}
        </button>
    );
};

export default Button;
