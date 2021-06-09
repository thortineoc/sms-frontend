import React, {useEffect, useState} from 'react'
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendPost from "../../../../utilities/CallBackendPost";
import './TimetableGeneration.css';
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";

const TimetableGeneration = ({setIsOpen}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [teachers, setTeachers] = useState([]);
    const [config, setConfig] = useState({});
    const [value, setValue] = useState({});

    const item = {
        '3e21ebc7-8247-4757-94f5-ddfdcee74f75': {
            'Chemistry': 5
        }
    }

    const handleSubmit = () => {
        setTimeout(() => {
            alert(JSON.stringify(config, null, 2));
        }, 500);
    }


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
            //if(config[id] === undefined || config[id][sub] === undefined) {
              //  console.log(value)
               // Object.assign(...config, value);
            //} else {

            //}
        }
    }, [value])

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(":)))))))))))))) " + config);
    }, [config])

    const fetchData = () => {
        callBackendPost(axiosInstance, "usermanagement-service/users/filter", {"role": "TEACHER"})
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => console.log(error))
    }
    {/*{/*onChange={ () => handleChange(e, teacher, subject)}/>**/}
    const handleChange = (e, teacherId, subjectId) => {
        setValue({[`${teacherId}`]: {
                [`${subjectId}`]: e.target.value
            }
        })
        //Object_assign(config, obj);
    }

    return (
        <div>
            <h3>Set amount of lessons the teacher conducts</h3>
            <table className="TimetableGeneration">
                <thead>
                <tr>
                    <th className="TimetableGeneration__header">Username</th>
                    <th className="TimetableGeneration__header">Full name</th>
                    <th className="TimetableGeneration__header-two">Amount of hours</th>
                </tr>
                </thead>

                <tbody>
                {teachers && teachers.map((teacher, ix) => (
                    <tr className="TimetableGeneration__body">
                        <td className="TimetableGeneration__cell">{teacher.userName}</td>
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
                                                    item[teacher.id] && item[teacher.id][subject] || 0}
                                        />
                                        </td>
                                    </div>
                                )))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <ButtonWrapper label="Save" className="TimetablesManagement__button" onClick={handleSubmit} style={{marginTop: '10px'}}/>
        </div>
    )
}

export default TimetableGeneration;
