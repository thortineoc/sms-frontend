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

const Timetable = ({type}) => {
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
                            <TimetableRow lessonId={ix} config={hours.config} type={type} />
                        ))
                    }
                    </tbody>
                </table>
            </ClassesProvider>
        </div>
    );
};

export default Timetable;