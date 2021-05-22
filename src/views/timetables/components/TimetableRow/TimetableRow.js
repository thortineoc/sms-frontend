import React from 'react';
import TimetableCell from "../TimetableCell/TimetableCell";

const TimetableRow = ({lessonId}) => {
    const lessonDayIndexesArr = [];
    for(let i=0; i<6; i++) {
        lessonDayIndexesArr.push(lessonId + i + 'D');
    }

    return (
        <tr>
            {
                lessonDayIndexesArr.map((ix) => (
                    <TimetableCell id={ix} />
                ))
            }
        </tr>
    );
};

export default TimetableRow;