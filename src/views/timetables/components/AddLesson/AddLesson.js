import React, {useEffect, useState} from 'react';
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendGet from "../../../../utilities/CallBackendGet";
import {Form, Formik} from "formik";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import * as Yup from "yup";


const initialValues = (day, lesson) => {
    return {
        id: '',
        groups: '',
        subject: '',
        teacher_id: '',
        weekday: day,
        room: '',
        lesson: lesson,
        conflict: ''
    }
}

const validationSchema = Yup.object({
    groups: Yup.string().required('Required'),
    subject: Yup.string().required('Required'),
    teacher_id: Yup.string().required('Required'),
    weekday: Yup.string().required('Required'),
    lesson: Yup.string().required('Required'),
})

const AddLesson = (day, lesson) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [groups, setGroups] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teacher, setTeacher] = useState([]);

    const fetchData = () => {
        callBackendGet(axiosInstance, "usermanagement-service/groups", null)
            .then(response => {
                console.log(response.data);
                setGroups(response.data);
            })
            .catch(error => console.log(error))
        callBackendGet(axiosInstance, "usermanagement-service/subjects", null)
            .then(response => {
                console.log(response.data);
                setSubjects(response.data);
            })
            .catch(error => console.log(error))
        callBackendGet(axiosInstance, "usermanagement-service/users/filter", {role: "TEACHER"})
            .then(response => {
                console.log(response.data);
                setTeacher(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData();
    }, []);


    const onSubmit = (values, {resetForm}) => {
        resetForm();
    }


    return (
        <>
            <h3>Create lesson</h3>
            <Formik
                initialValues={initialValues(day, lesson)}
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
                                    label="Group"
                                    name="groups"
                                    options={groups}
                                />

                                <SelectFieldWrapper
                                    label="Teacher"
                                    name="teacher_id"
                                    options={teacher}
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
    );
}

export default AddLesson;