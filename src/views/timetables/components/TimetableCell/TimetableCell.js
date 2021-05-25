import React, {useContext} from 'react';
import './TimetableCell.css';
import TimeCell from "../TimeCell/TimeCell";
import LessonCell from "../LessonCell/LessonCell";
import {ClassesContext} from '../TimetableContextApi/TimetableContext';

const getRowNumber = (id) => {
    let pos = id.indexOf('L');
    return Number.parseInt(id.slice(0, pos));
}

const getColNumber = (id) => {
    let start = id.indexOf('L') + 1;
    let end = id.indexOf('R');
    return Number.parseInt(id.slice(start, end));
}

const TimetableCell = ({id, config}) => {
    const [value, setValue] = useContext(ClassesContext);

    const handleClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        alert(id);
    }

    console.log(config);
    //console.log(config(getRowNumber(id)));

    return (
        <td className="TimetableCell" onClick={handleClick}>
            <div className="TimetableCell__content">
                { getColNumber(id) === -1 ? (
                    <TimeCell time={config[getRowNumber(id)]}/>
                ) : (
                    value   && value[getColNumber(id)]
                            && value[getColNumber(id)][getRowNumber(id)]
                            && <LessonCell value={value[getColNumber(id)][getRowNumber(id)]} />
                )}
            </div>
        </td>
    );
}

export default TimetableCell;