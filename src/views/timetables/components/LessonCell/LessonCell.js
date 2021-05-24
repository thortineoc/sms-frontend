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
                {value && value.subject && <div><strong>{value.subject}</strong></div>}
                {value && value.teacher && <div><span style={{color: '#444'}}>Teacher: </span>{value.teacher}</div>}
                {value && value.room && <div><span style={{color: '#444'}}>Room: </span>{value.room}</div>}
            </div>
        </div>
    );
}

export default LessonCell;