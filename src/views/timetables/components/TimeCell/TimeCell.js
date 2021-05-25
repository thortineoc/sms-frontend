import React from 'react';
import './TimeCell.css';

const TimeCell = ({time = ''}) => {
    const clearClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    return (
        <div className="TimeCell" onClick={clearClick}>

        </div>
    );
};

export default TimeCell;