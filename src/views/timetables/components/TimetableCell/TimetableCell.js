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

const TimetableCell = ({id}) => {
    const [value, setValue] = useContext(ClassesContext);
    console.log(value);
    console.log(getColNumber(id) + " i " + getRowNumber(id));

    return (
        <td className="TimetableCell" onClick={() => alert(id)}>
            <div className="TimetableCell__content">
                { getColNumber(id) === 0 ? (
                    <TimeCell />
                ) : (
                    value   && value[getColNumber(id) - 1]
                            && value[getColNumber(id) - 1][getRowNumber(id)]
                            && <LessonCell value={value[getColNumber(id) - 1][getRowNumber(id)]} />
                )}
            </div>
        </td>
    );
}

export default TimetableCell;