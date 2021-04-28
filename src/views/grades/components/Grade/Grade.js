import React from 'react';
import './Grade.css';

const Grade = ({value, weight}) => {
    const classes = `Grade Grade-weight${weight}`

    return (
        <div className={classes}>
            {value}
        </div>
    );
};

export default Grade;
