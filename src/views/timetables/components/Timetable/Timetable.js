import React, {useEffect, useState} from 'react';
import GradesTableRow from "../../../grades/components/GradesTableRow/GradesTableRow";
import './Timetable.css';
import TimetableRow from "../TimetableRow/TimetableRow";
import {ClassesProvider} from "../TimetableContextApi/TimetableContext";
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendGet from "../../../../utilities/CallBackendGet";

const COLUMNS = [
    '',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
]

const conf = {
    config: [{'beginTime': '8:00', 'endTime': '8:45'}, {'beginTime': '9:00', 'endTime': '9:45'},
        {'beginTime': '10:00', 'endTime': '10:45'},{'beginTime': '11:00', 'endTime': '11:45'}

    ],
    lessonCount: 5
}

const Timetable = () => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [hours, setHours] = useState({});
    const fetchData = () => {
        callBackendGet(axiosInstance, "/timetable-service/config", null)
            .then(response => {
                setHours(response.data);
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        fetchData();
    }, [])

    const lessonIndexesArr = [];
    console.log(hours.lessonCount)
    for(let i=0; i<hours.lessonCount; i++) {
        lessonIndexesArr.push(i + 'L');
    }

    console.log(hours);
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
                            <TimetableRow lessonId={ix} config={hours.config} />
                        ))
                    }
                    </tbody>
                </table>
            </ClassesProvider>
        </div>
    );
};

export default Timetable;