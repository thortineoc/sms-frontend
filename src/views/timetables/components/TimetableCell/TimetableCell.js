import React, {useContext, useEffect, useState} from 'react';
import './TimetableCell.css';
import TimeCell from "../TimeCell/TimeCell";
import LessonCell from "../LessonCell/LessonCell";
import {ClassesContext} from '../TimetableContextApi/TimetableContext';
import callBackendGet from "../../../../utilities/CallBackendGet";
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import TimetableRow from "../TimetableRow/TimetableRow";

const getRowNumber = (id) => {
    let pos = id.indexOf('L');
    return Number.parseInt(id.slice(0, pos));
}

const getColNumber = (id) => {
    let start = id.indexOf('L') + 1;
    let end = id.indexOf('R');
    return Number.parseInt(id.slice(start, end));
}

const TimetableCell = ({id, config, type, timetable, refresh, setRefresh}) => {

    const handleClick = e => {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        alert(id);
    }

    return (
        <td className="TimetableCell" onClick={type === 'ADMIN' && handleClick}>
            <div className={`TimetableCell__content ${type === 'ADMIN' ? 'TimetableCell__content-admin' : ''}`}>
                { getColNumber(id) === -1 ? (
                    <TimeCell time={config[getRowNumber(id)]}/>
                ) : (
                    timetable && timetable[getColNumber(id)]
                              && timetable[getColNumber(id)][getRowNumber(id)]
                              && <LessonCell value={timetable[getColNumber(id)][getRowNumber(id)]} type={type} refresh={refresh} setRefresh={setRefresh}/>
                )}
            </div>
        </td>
    );
}

export default TimetableCell;