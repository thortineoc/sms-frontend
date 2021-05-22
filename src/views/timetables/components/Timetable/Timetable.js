import React from 'react';
import GradesTableRow from "../../../grades/components/GradesTableRow/GradesTableRow";
import './Timetable.css';
import TimetableRow from "../TimetableRow/TimetableRow";

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
            <table className="Timetable">
                <thead>
                <tr>
                    {COLUMNS.map((item) => (
                        <th>{item}</th>
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
        </div>
    );
};

export default Timetable;