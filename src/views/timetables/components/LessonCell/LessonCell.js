import React from 'react';
import './LessonCell.css'

const LessonCell = ({value}) => {
    return (
        <div className="LessonCell" onClick={() => alert("LESSON " + value.subject)}>
            <div>{value && value.subject}</div>
            <div>Room: {value ? value.room : '-'}</div>
        </div>
    );
};

export default LessonCell;