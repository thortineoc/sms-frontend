import React, {useEffect, useState} from 'react';
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendGet from "../../../../utilities/CallBackendGet";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import callBackendPost from "../../../../utilities/CallBackendPost";
import TimePickerWrapper from "../../../../components/TimePickerWrapper/TimePickerWrapper";
import {Grid} from "@material-ui/core";
import * as Yup from "yup";



const ManageTimeWindow = ({setIsOpen}) => {
    const [response, setResponse] = useState(null);
    const axiosInstance = useAxios(smsConfig.haproxyUrl);

    const fetchData = () => {
        callBackendGet(axiosInstance, "/timetable-service/config", null)
            .then(response => {
                setResponse(response);
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onSubmit = (values) => {
        let data = {}
        data.lessonCount = values.lessonCount
        data.config = []
        for(let i=0; i<data.lessonCount; i++){
            let temp = {}
            temp.startTime = "00:00"
            temp.endTime = "00:00"
            data.config.push(temp)
        }
        callBackendPost(axiosInstance, "/timetable-service/config", data)
            .then(response => {
                console.log(response)
                setIsOpen(false)
            })
            .catch(error => console.log(error))
    }

    const onSubmit1 = (values) => {
        console.log(values)
        let data = {}
        data.lessonCount = values.lessonCount
        data.config = []
        for(let i = 0; i<values.lessonCount; i++){
            let temp = {}
            temp.startTime = values[("startTime"+(i+1))].toTimeString().substr(0,5)
            temp.endTime = values[("endTime"+(i+1))].toTimeString().substr(0,5)
            data.config.push(temp)
        }
        callBackendPost(axiosInstance, "/timetable-service/config", data)
            .then(response => {
                fetchData()
                setIsOpen(false)
            })
            .catch(error => console.log(error))
    }

    const validationSchema = Yup.object({
        lessonCount: Yup.number().integer().min(1).max(12).required('Required')
    })

    const getInitialValues = (data) =>{
        const init = {}
        init.lessonCount = data.lessonCount;

        data.config.map((lesson, i)=>{
            init["startTime"+(i+1)]=new Date("December 17, 1995 " + lesson.startTime)
            init["endTime"+(i+1)]=new Date("December 17, 1995 " + lesson.endTime)
        })
        return init
    }

    return (
        <div>
            <h3>Set breaks length</h3>
            <Formik
                enableReinitialize
                initialValues={((response && response.status === 200) ? response.data : {lessonCount: 0})}
                validationSchema={validationSchema}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        return (
                            <Form>
                                <div>
                                    {formik.errors && formik.errors.submit &&
                                    <div className="error">{formik.errors.submit}</div>}
                                    <TextFieldWrapper
                                        id="lessonCount"
                                        label={"Number of lessons"}
                                        name={"lessonCount"}
                                        type="text"
                                    />
                                </div>

                                <ButtonWrapper
                                    type="submit"
                                    label="Save"
                                />

                            </Form>
                        )
                    }
                }
            </Formik>

            {response && response.data.lessonCount > 0 ? (
                <Formik
                    enableReinitialize
                    initialValues={getInitialValues(response.data)}
                    //validationSchema={validationSchema}
                    validateOnChange={false}
                    onSubmit={onSubmit1}
                >
                    {
                        formik => {
                            return (
                                <Form>
                                    <div>
                                        {formik.errors && formik.errors.submit &&
                                        <div className="error">{formik.errors.submit}</div>}

                                        {[...Array(response.data.lessonCount)].map((x, i) =>
                                            <Grid container justify="space-around">
                                                <TimePickerWrapper
                                                    name={"startTime"+(i+1)}
                                                    label={"Lesson " + (i+1) + " start time"}
                                                    init={getInitialValues(response.data)["startTime"+(i+1)]}
                                                />
                                                <TimePickerWrapper
                                                    name={"endTime"+(i+1)}
                                                    label={"Lesson " + (i+1) + " end time"}
                                                    init={getInitialValues(response.data)["endTime"+(i+1)]}
                                                />
                                            </Grid>
                                        )}



                                        <ButtonWrapper
                                            type="submit"
                                            label="Save"
                                        />
                                    </div>
                                </Form>
                            )
                        }
                        }
                        </Formik>


                        ) : (<></>)}
                </div>
            );
            };

export default ManageTimeWindow;