import React, {useEffect, useState} from 'react';
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

const conf = {
    config: [{'beginTime': '8:00', 'endTime': '8:45'}, {'beginTime': '9:00', 'endTime': '9:45'}],
    lessonCount: 10
}

const Timetable = () => {
    const [hours, setHours] = useState({});
    useEffect(() => {
        setHours(conf);
    }, [])

    const lessonIndexesArr = [];
    useEffect(() => {
        for(let i=0; i<hours.lessonCount; i++) {
            lessonIndexesArr.push(i + 'L');
        }
    }, [hours])


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