import React from 'react';
import './TimeCell.css';

const TimeCell = () => {
    const clearClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    return (
        <div className="TimeCell" onClick={clearClick}>
            8:00
        </div>
    );
};

export default TimeCell;