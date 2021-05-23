import React, {useState} from 'react';
import GradesTableRow from "../../../grades/components/GradesTableRow/GradesTableRow";
import './Timetable.css';
import TimetableRow from "../TimetableRow/TimetableRow";
import {ClassesProvider} from "../TimetableContextApi/TimetableContext";

const COLUMNS = [
    '',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
]

const max_lessons = 10;

const Timetable = () => {
    const lessonIndexesArr = [];
    for(let i=0; i<max_lessons; i++) {
        lessonIndexesArr.push(i + 'L');
    }

    return (
        <div>
            <ClassesProvider>
                <table className="Timetable">
                    <thead>
                    <tr>
                        {COLUMNS.map((item) => (
                            <th className="Timetable__header">{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        lessonIndexesArr.map((ix) => (
                            <TimetableRow lessonId={ix}/>
                        ))
                    }
                    </tbody>
                </table>
            </ClassesProvider>
        </div>
    );
};

export default Timetable;