import React, {useContext, useState} from 'react';
import './TimetableCell.css';
import TimeCell from "../TimeCell/TimeCell";
import LessonCell from "../LessonCell/LessonCell";
import {ClassesContext} from '../TimetableContextApi/TimetableContext';
import AddLesson from "../AddLesson/AddLesson";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import ManageTimeWindow from "../ManageTimeWindow/ManageTimeWindow";

const getRowNumber = (id) => {
    let pos = id.indexOf('L');
    return Number.parseInt(id.slice(0, pos));
}

const getColNumber = (id) => {
    let start = id.indexOf('L') + 1;
    let end = id.indexOf('R');
    return Number.parseInt(id.slice(start, end));
}

const TimetableCell = ({id}) => {
    const [value, setValue] = useContext(ClassesContext);
    const [showAddLesson, setShowAddLesson] = useState(false);

    const handleClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        alert(id);
        setShowAddLesson( true);
    }

    return (
        <td className="TimetableCell" onClick={handleClick}>
            <div className="TimetableCell__content">
                { getColNumber(id) === -1 ? (
                    <TimeCell />
                ) : (
                    value   && value[getColNumber(id)]
                            && value[getColNumber(id)][getRowNumber(id)]
                            && <LessonCell value={value[getColNumber(id)][getRowNumber(id)]} />

                )}

                {showAddLesson && (
                    <Modal isOpen={showAddLesson} setIsOpen={setShowAddLesson}>
                        <AddLesson
                            value={[getColNumber(id)][getRowNumber(id)]}
                        />
                    </Modal>
                )}
            </div>
        </td>
    );
}

export default TimetableCell;