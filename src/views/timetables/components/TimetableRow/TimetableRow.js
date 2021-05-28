import React from 'react';
import TimetableCell from "../TimetableCell/TimetableCell";

const TimetableRow = ({lessonId, config, type}) => {
    const lessonDayIndexesArr = [];
    for(let i=-1; i<5; i++) {
        lessonDayIndexesArr.push(lessonId + i + 'D');
    }

    return (
        <tr>
            {
                lessonDayIndexesArr.map((ix) => (
                    <TimetableCell id={ix} config={config} type={type} />
                ))
            }
        </tr>
    );
};

export default TimetableRow;