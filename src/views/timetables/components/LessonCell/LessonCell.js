import React, {useState} from 'react';
import './LessonCell.css'
import Modal from "../../../../components/Modal/Modal";
import EditDeleteLesson from "../EditDeleteLesson/EditDeleteLesson";

const LessonCell = ({value}) => {
    const [showEdit, setShowEdit] = useState(false);
    const handleClick = e => {
        setShowEdit(true)
        // e.cancelBubble = true;
        // if (e.stopPropagation) e.stopPropagation();
        // alert("LESSON " + value.subject)
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
            <Modal isOpen={showEdit} setIsOpen={setShowEdit}>
                <EditDeleteLesson
                    setIsOpen={setShowEdit}
                    lesson={value}
                />
            </Modal>
        </div>
    );
}

export default LessonCell;