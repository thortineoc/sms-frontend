import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import DatepickerWrapper from "../../../../components/DatepickerWrapper/DatepickerWrapper";
import callBackendGet from "../../../../utilities/CallBackendGet";
import useAxios from "../../../../utilities/useAxios";
import getKeycloakSubjects from "../../../../utilities/GetSubjects";
import {useKeycloak} from "@react-keycloak/web";


const initial = {
    group: "",
    subject: "",
    title: "",
    description: "",
    deadline: "",
}

const AssignEditHomeworkForm = (props) => {
    const[error, setError] = useState("");
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [groups, setGroups] = useState([]);


    const onSubmit = (values, setSubmitting, setValues) =>{
        console.log(values);
    }

    const fetchGroups = () => {
        callBackendGet(axiosInstance, "usermanagement-service/groups", null)
            .then(response => {
                console.log(response.data);
                setGroups(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchGroups();
    }, []);


    return (
        <Formik
            initialValues={initial}
            //validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={(values, {setSubmitting, setValues}) => onSubmit(values, setSubmitting, setValues)}
        >
            {
                formik => {
                    return (
                        <Form style={{padding: "0px"}}>
                            <h3>Add assignment</h3>
                            {(error.length>0 ? <p>{error}</p> : <div/>)}
                            <div>
                                {formik.errors && formik.errors.submit &&
                                <div className="error">{formik.errors.submit}</div>}

                                <TextFieldWrapper
                                    label="Title"
                                    name="title"
                                    type="text"
                                />

                                <TextFieldWrapper
                                    label="Description"
                                    name="description"
                                    type="text"
                                    multiline
                                    rowsMax={6}
                                />

                                <SelectFieldWrapper
                                    label="Group"
                                    name="group"
                                    options={groups}
                                />

                                <SelectFieldWrapper
                                    label="Subject"
                                    name="subject"
                                    options={props.subjects}
                                />


                                <DatepickerWrapper
                                name={"deadline"}
                                label={"Deadline"}
                                />

                                <div className="CreateForm__button-wrapper">
                                    <ButtonWrapper type="submit" label="Add" disabled={formik.isSubmitting} style={{margin:"5px"}}/>
                                </div>

                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default AssignEditHomeworkForm;

