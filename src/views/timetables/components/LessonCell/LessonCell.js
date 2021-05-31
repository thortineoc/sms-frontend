import React, {useState} from 'react';
import './LessonCell.css'
import AddLesson from "../AddLesson/AddLesson";
import Modal from "../../../../components/Modal/Modal";

const LessonCell = ({value}) => {
    const [showAddLesson, setShowAddLesson] = useState(false);
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
            </div>
        </div>
    );
}

export default LessonCell;