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

const Timetable = ({type, group, setRefresh, refresh}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [hours, setHours] = useState({});
    const [timetable, setTimetable] = useState([]);
    const [teachers, setTeachers] = useState({});
    const [classes, setClasses] = useState([]);

    // useEffect(() => {
    //     if(setRefresh){
    //         setRefresh(false);
    //     }
    //     fetchTimetable();
    // }, [])

    const fetchTimetable = () => {
        if(group) {
            var url = `/timetable-service/timetables/${group}`;
        }
        if(type === 'STUDENT') {
            var url = '/timetable-service/timetables/student';
        } else if(type === 'TEACHER') {
            var url = '/timetable-service/timetables/teacher';
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

    // useEffect(() => {
    //     fetchHours();
    //     if(type === 'ADMIN') {
    //         if(group !== undefined) {
    //             fetchTimetable();
    //         }
    //     } else {
    //         fetchTimetable();
    //     }
    //
    //
    // }, [])

    useEffect(() => {
        fetchHours();
        if(type === 'ADMIN') {
            if(group !== undefined) {
                fetchTimetable();
            }
        } else {
            fetchTimetable();
        }

        if(setRefresh){
            setRefresh(false);
        }
    }, [group, setRefresh, refresh])


    useEffect(() => {
        setClasses(timetable['lessons']);
        setTeachers(timetable['teachers']);
    },[timetable])

    if(classes !== [] && teachers !== {} && classes !== undefined && teachers !== undefined) {
        classes.forEach((lesson, lessonId) => {
            Object.keys(teachers).forEach(id => {
                if(lesson && lesson.teacherId === id) {
                    const name = teachers[id].firstName + " " + teachers[id].lastName;
                    classes[lessonId] = {...lesson, teacher: name}
                }
            })
        })
    }

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
                        <TimetableRow lessonId={ix} config={hours.config} type={type} timetable={classes} refresh={refresh} setRefresh={setRefresh} group={group}/>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;