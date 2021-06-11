import React from 'react';
import TimetableCell from "../TimetableCell/TimetableCell";

const TimetableRow = ({lessonId, config, type, timetable, refresh, setRefresh}) => {
    const lessonDayIndexesArr = [];
    for(let i=-1; i<5; i++) {
        lessonDayIndexesArr.push(lessonId + i + 'D');
    }

    return (
        <tr>
            {
                lessonDayIndexesArr.map((ix) => (
                    <TimetableCell id={ix} config={config} type={type} timetable={timetable} refresh={refresh} setRefresh={setRefresh}/>
                ))
            }
        </tr>
    );
};

export default TimetableRow;