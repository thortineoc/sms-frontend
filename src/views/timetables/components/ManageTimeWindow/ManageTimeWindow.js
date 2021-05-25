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
        callBackendPost(axiosInstance, "/timetable-service/config", values)
            .then(response => {
                console.log(response)
                fetchData()
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
        //console.log(data)
        callBackendPost(axiosInstance, "/timetable-service/config", data)
            .then(response => {
                //console.log(response)
                fetchData()
            })
            .catch(error => console.log(error))
    }

    const getInitialValues = (lessonCount) =>{
        const init = {}
        init.lessonCount = lessonCount;
        for(let i=0; i<lessonCount; i++){
            init["startTime"+(i+1)]=""
            init["endTime"+(i+1)]=""
        }
        return init
    }


    return (
        <div>
            <h3>Set breaks length</h3>
            <Formik
                enableReinitialize
                initialValues={((response && response.status === 200) ? response.data : {lessonCount: 0})}
                //validationSchema={validationSchema}
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
                    initialValues={getInitialValues(response.data.lessonCount)}
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
                                                />
                                                <TimePickerWrapper
                                                    name={"endTime"+(i+1)}
                                                    label={"Lesson " + (i+1) + " end time"}
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