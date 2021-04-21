import React from 'react';
import './Button.css';

const Button = ({label, ...rest}) => {
    return (
        <button className="Button" {...rest}>
            {label}
        </button>
    );
};

export default Button;
