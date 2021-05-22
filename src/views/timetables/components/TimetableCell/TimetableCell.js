import React from 'react';
import './TimetableCell.css';
import TimeCell from "../TimeCell/TimeCell";
import LessonCell from "../LessonCell/LessonCell";

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

    return (
        <td className="TimetableCell">
            <div className="TimetableCell__content">
                { getColNumber(id) === 0 ? (
                    <TimeCell />
                ) : (
                    <LessonCell />
                )}
            </div>
        </td>
    );
}

export default TimetableCell;