import React, {useEffect, useState} from 'react';
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendGet from "../../../../utilities/CallBackendGet";
import {Form, Formik} from "formik";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import * as Yup from "yup";
import callBackendPost from "../../../../utilities/CallBackendPost";


const initialValues = (day, lesson, group) => {
    return {
        group: group,
        subject: '',
        teacherId: '',
        weekday: day,
        room: '',
        lesson: lesson,
    }
}

const validationSchema = Yup.object({
    subject: Yup.string().required('Required'),
    teacherId: Yup.string().required('Required'),
})

const AddLesson = ({weekday, lesson, group, refresh, setRefresh, setIsOpen}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [groups, setGroups] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [teachersId, setTeachersId] = useState({});
    const [error, setError] = useState("");

    const fetchData = () => {

        callBackendGet(axiosInstance, "usermanagement-service/subjects", null)
            .then(response => {
                console.log(response.data);
                setSubjects(response.data);
            })
            .catch(error => console.log(error))


        let data = {
            role: "TEACHER"
        }

        callBackendPost(axiosInstance, "/usermanagement-service/users/filter", data)
            .then(response => {

                let teacherNames = []
                let teachers = {}

                for (const teacher of response.data) {
                   let name = teacher.firstName + " " + teacher.lastName;
                   teacherNames.push(name)
                    teachers[name]=teacher.id;
                }
                setTeachersId(teachers);
                setTeachers(teacherNames);
                console.log(teachers)

            })
            .catch(error => {
                console.log(error)
                setError("Cannot create this lesson")
            })
    }

    useEffect(() => {
        fetchData();
    }, []);


    const onSubmit = (values, {resetForm}) => {
        setError("");
        let val = values;
        val.teacherId = teachersId[values.teacherId];
        let data = {
            lessons: [val]
        }
        callBackendPost(axiosInstance, "/timetable-service/timetables", data)
            .then(()=>{
                setRefresh(true);
                setIsOpen(false);
            })
            .catch(error => console.log(error))
    }


    return (
        <>
            <h3>Create lesson</h3>
            <p>{(error.length>0 ? error : "")}</p>
            <Formik
                initialValues={initialValues(weekday, lesson, group)}
                validationSchema={validationSchema}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        return (
                            <Form>
                                {formik.errors && formik.errors.submit &&
                                <div className="error">{formik.errors.submit}</div>}

                                <SelectFieldWrapper
                                    label="Subject"
                                    name="subject"
                                    options={subjects}
                                />


                                <SelectFieldWrapper
                                    label="Teacher"
                                    name="teacherId"
                                    options={teachers}
                                />

                                <TextFieldWrapper
                                    label="Room"
                                    name="room"
                                    type="text"
                                />

                                <ButtonWrapper type="submit" label="Submit" disabled={formik.isSubmitting}/>
                            </Form>
                        )
                    }
                }
            </Formik>
            </>
    )
}

export default AddLesson;