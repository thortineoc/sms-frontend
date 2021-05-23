import React from 'react';
import './LessonCell.css'

const LessonCell = ({value}) => {
    return (
        <div className="LessonCell">
            {value && value.subject}
        </div>
    );
};

export default LessonCell;