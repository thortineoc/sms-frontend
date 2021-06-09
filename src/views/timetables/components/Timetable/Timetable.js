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

const Timetable = ({type, group}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [hours, setHours] = useState({});
    const [timetable, setTimetable] = useState([]);

    const fetchTimetable = () => {
        let url = `/timetable-service/timetables/${group}`;
        switch ({type}) {
            case 'ADMIN':
                url += '1A';
                break;
            case  'STUDENT':
                url += 'students';
                break;
            case  'TEACHER':
                url += 'teacher';
                break;
        }

        callBackendGet(axiosInstance, url, null)
            .then(response => {
                setTimetable(response.data);
            })
            .catch(error => console.log(error))
    }

    const fetchHours = () => {
        callBackendGet(axiosInstance, "/timetable-service/config", null)
            .then(response => {
                setHours(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchHours();
        if(type === 'ADMIN') {
            if(group !== undefined) {
                fetchTimetable();
            }
        } else {
            fetchTimetable();
        }

    }, [])

    useEffect(() => {
        fetchHours();
        if(type === 'ADMIN') {
            if(group !== undefined) {
                fetchTimetable();
            }
        } else {
            fetchTimetable();
        }

    }, [group])

    const lessonIndexesArr = [];
    for(let i=0; i<hours.lessonCount; i++) {
        lessonIndexesArr.push(i + 'L');
    }

    return (
        <div>
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
                        <TimetableRow lessonId={ix} config={hours.config} type={type} timetable={timetable} />
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;