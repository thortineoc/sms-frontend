import React, {useState} from 'react';
import './LessonCell.css'
import Modal from "../../../../components/Modal/Modal";
import EditDeleteLesson from "../EditDeleteLesson/EditDeleteLesson";

const LessonCell = ({value, type}) => {
    const [showEdit, setShowEdit] = useState(false);
    const handleClick = () => {
        setShowEdit(true)
    }

    const clearClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
    }

    return (
        <div className="LessonCell__wrapper" onClick={type === 'ADMIN' && clearClick}>
            <div className={`LessonCell ${type === 'ADMIN' ? 'LessonCell__admin' : ''}`}
                 onClick={type === 'ADMIN' && handleClick}>
                {value && value.subject && <div><strong>{value.subject}</strong></div>}
                {type !== 'TEACHER' && value && value.teacher && <div><span style={{color: '#444'}}>Teacher: </span>{value.teacher}</div>}
                {value && value.room && <div><span style={{color: '#444'}}>Room: </span>{value.room}</div>}
            </div>
            {type === 'ADMIN' &&
            <Modal isOpen={showEdit} setIsOpen={setShowEdit}>
                <EditDeleteLesson
                    setIsOpen={setShowEdit}
                    lesson={value}
                />
            </Modal>
            }
        </div>
    );
}

export default LessonCell;