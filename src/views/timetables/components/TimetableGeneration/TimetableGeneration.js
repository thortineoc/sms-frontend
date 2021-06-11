import React, {useEffect, useState} from 'react'
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendPost from "../../../../utilities/CallBackendPost";
import './TimetableGeneration.css';
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import callBackendGet from "../../../../utilities/CallBackendGet";

const TimetableGeneration = ({group, setIsOpen, setRefresh, refresh}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [teachers, setTeachers] = useState([]);
    const [config, setConfig] = useState({});
    const [value, setValue] = useState({});
    const [timetable, setTimetable] = useState([]);

    function Object_assign(target, ...sources) {
        sources.forEach(source => {
            Object.keys(source).forEach(key => {
                const s_val = source[key]
                const t_val = target[key]
                target[key] = t_val && s_val && typeof t_val === 'object' && typeof s_val === 'object'
                    ? Object_assign(t_val, s_val)
                    : s_val
            })
        })
        return target
    }

    useEffect(() => {
        if(value !== {} && value !== undefined) {
            const id = Object.keys(value)[0];
            console.log(id);
            let sub;
            if(value[id] !== undefined) {
                 sub = Object.keys(value[id])[0];
                 if(config[id] === undefined) {
                     Object_assign(config, value);
                 } else {
                     config[id][sub] = value[id][sub];
                 }
            }
        }
    }, [value])

    useEffect(() => {
        fetchData();
        //fetchConfig();
    }, [])

    const fetchConfig = () => {
        callBackendGet(axiosInstance, "/config", null)
            .then(response => {
                setConfig(response.data);
            })
            .catch(error => console.log(error))
    }

    const fetchData = () => {
        callBackendPost(axiosInstance, "usermanagement-service/users/filter", {"role": "TEACHER"})
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => console.log(error))
    }

    const generateTimetable = () => {
        callBackendPost(axiosInstance, `/timetable-service/timetables/generate/${group}`, JSON.stringify(config))
            .then(response => {
                //setTimetable(response.data);
                setRefresh(true);
                setIsOpen(false);
            })
            .catch(error => console.log(error))
    }

    const handleChange = (e, teacherId, subjectId) => {
        setValue({[`${teacherId}`]: {
                [`${subjectId}`]: e.target.value
            }
        })
    }

    const handleSubmit = () => {
        generateTimetable();
    }

    return (
        <div>
            <h3>Set amount of lessons the teacher conducts</h3>
            <table className="TimetableGeneration">
                <thead>
                <tr>
                    <th className="TimetableGeneration__header">Full name</th>
                    <th className="TimetableGeneration__header-two">Amount of hours</th>
                </tr>
                </thead>

                <tbody>
                {teachers && teachers.map((teacher, ix) => (
                    <tr className="TimetableGeneration__body">
                        <td className="TimetableGeneration__cell">{teacher.firstName + " " + teacher.lastName}</td>
                        <td className="TimetableGeneration__cell">
                            {teacher.customAttributes.subjects.map((subject =>
                                subject !== '' && (
                                    <div className="TimetableGeneration__cell-subject">
                                        {subject}
                                        <td><input
                                                type="number" min={0} name={teacher + '_' + subject}
                                                onChange={e => handleChange(e, teacher.id, subject)}
                                                style={{width: '100px'}}
                                                placeholder={
                                                    config[teacher.id] && config[teacher.id][subject] || 0}
                                        />
                                        </td>
                                    </div>
                                )))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ButtonWrapper label="generate"
                           className="TimetablesManagement__button"
                           onClick={handleSubmit}
                           style={{marginTop: '10px', float: 'right', minHeight: '40px'}}
            />
        </div>
    )
}

export default TimetableGeneration;
