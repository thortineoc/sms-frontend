import React, {useEffect, useState} from 'react'
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendPost from "../../../../utilities/CallBackendPost";
import './TimetableGeneration.css';

const COLUMNS = ['Teacher ID', 'Full Name', 'Subjects', 'Amount'];

const TimetableGeneration = ({setIsOpen}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [teachers, setTeachers] = useState([]);
    const [config, setConfig] = useState({});
    const [value, setValue] = useState('');

    useEffect(() => {
        console.log(config);
    }, [config])


    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        callBackendPost(axiosInstance, "usermanagement-service/users/filter", {"role": "TEACHER"})
            .then(response => {
                setTeachers(response.data);
            })
            .catch(error => console.log(error))
    }
    {/*{/*onChange={ () => handleChange(e, teacher, subject)}/>**/}
    const handleChange = (e, teacherId, subjectId) => {

        setConfig({...config}, {[`${teacherId}`]: {
                [`${subjectId}`]: e.target.value
            }
        })
    }

    const handleChange2 = (e, teacherId, subjectId) => {
        setConfig({teacherId: {
                subjectId: e.target.value
            }
        })
        //setValue(e.target.value);
    }

    return (
        <div>
            <h3>Set amount of lessons the teacher conducts</h3>
            <table className="TimetableGeneration">
                <thead>
                <tr>
                    {COLUMNS.map((item) => (
                        <th className="TimetableGeneration__header">{item}</th>
                    ))}
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
                                        <input name={teacher + '_' + subject}
                                               onChange={e => handleChange(e, teacher.id, subject)} />
                                    </div>
                                )))}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TimetableGeneration;
