import React, {useEffect, useState} from 'react';
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendGet from "../../../../utilities/CallBackendGet";
import {Form, Formik} from "formik";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";

const AddLesson = () => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [groups, setGroups] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [lessons, setLessons] = useState([]);

    const fetchData = () => {
        callBackendGet(axiosInstance, "usermanagement-service/groups", null)
            .then(response => {
                console.log(response.data);
                setGroups(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData();
    }, []);


    const onSubmit = (values, resetForm) => {
        resetForm();
    }


    return (
        <>
            <h3>Create lesson</h3>
            <Formik
                initialValues={''}
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
                                    name="group"
                                    options={groups}
                                />

                                <SelectFieldWrapper
                                    label="Teacher"
                                    name="teacher"
                                    options={teachers}
                                />

                                <SelectFieldWrapper
                                    label="Weekday"
                                    name="weekday"
                                    options={[0,1,2,3,4,5]}
                                />

                                <SelectFieldWrapper
                                    label="Lesson"
                                    name="lesson"
                                    options={lessons}
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