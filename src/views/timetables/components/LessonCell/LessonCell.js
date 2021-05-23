import React from 'react';
import './LessonCell.css'

const LessonCell = ({value}) => {
    const handleClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        alert("LESSON " + value.subject)
    }

    const clearClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    return (
        <div className="LessonCell__wrapper" onClick={clearClick}>
            <div className="LessonCell" onClick={handleClick}>
                <div>{value && value.subject}</div>
                <div>Room: {value ? value.room : '-'}</div>
            </div>
        </div>
    );
}

export default LessonCell;