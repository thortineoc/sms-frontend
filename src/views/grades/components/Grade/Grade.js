import React from 'react';
import './Grade.css';
import MouseOverPopover from "../Popover/Popover";

const Grade = ({value}) => {
    const classes = `Grade Grade-weight${value.weight}`

    const gradeIcon = value.grade

    return (
        <MouseOverPopover weight={value.weight} description={value.description}>
            <div className={classes}>
                {value.grade}
            </div>
        </MouseOverPopover>
    );
};

export default Grade;
