import React from 'react';
import './TimeCell.css';

const TimeCell = ({time = null}) => {
    const clearClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    return (
        <div className="TimeCell" onClick={clearClick}>
            {time && time.beginTime + ' - ' + time.endTime}
        </div>
    );
};

export default TimeCell;