import React from 'react';
import './Grade.css';
import MouseOverPopover from "../Popover/Popover";

const convertGrade = value => {
    const gradeArr = value.toString().split('.');
    if(gradeArr[1] && gradeArr[1] === '5') {
        gradeArr[1] = '+';
    } else {
        gradeArr[0] = parseInt(gradeArr[0]) + 1;
        gradeArr[1] = '-';
    }
    return gradeArr.join('');
}

const Grade = ({value, type}) => {
    const classes = `Grade Grade-weight${value.weight} Grade-${type}`

    let result = value.grade;
    if(!Number.isInteger(result)) {
        result = convertGrade(result)
    }

    return (
        <MouseOverPopover weight={value.weight} description={value.description}>
            <div className={classes}>
                {result}
            </div>
        </MouseOverPopover>
    );
};

export default Grade;
