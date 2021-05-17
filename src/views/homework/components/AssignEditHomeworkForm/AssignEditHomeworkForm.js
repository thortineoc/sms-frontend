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
import axios from "axios";
import UploadFile from "../../../../components/UploadFIle/UploadFile";
import callBackendPut from "../../../../utilities/CallBackendPut";
import * as Yup from "yup";

const initial = {
    group: "",
    subject: "",
    title: "",
    description: "",
    deadline: "",
}

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    group: Yup.string().required('Required'),
    subject: Yup.string().required('Required'),

})

const AssignEditHomeworkForm = (props) => {
    const[error, setError] = useState("");
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [groups, setGroups] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';

    useEffect(() => {
        if (!!initialized) {
            getKeycloakSubjects(keycloak, setAllSubjects);
        }
    }, [keycloak, initialized])


    const attachFile = (id) => {
        if(selectedFile){
            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: initialized ? `Bearer ${kcToken}` : undefined,
            }
            let formData = new FormData();
            formData.append("file", selectedFile);
            axios.post("http://52.142.201.18:24020/homework-service/files/upload/" + id + "/HOMEWORK", formData, {
                headers: headers})
                .then(response => {
                    if(response.status>204) {
                        setError("Cannot upload file.")
                    } else {
                        props.setIsOpen(false)
                    }
                })
                .catch(error => setError("Cannot upload file."))
        } else {
            props.setIsOpen(false)
        }
    }

    const onSubmit = (values, setSubmitting, setValues) =>{
        console.log(values);
        callBackendPut(axiosInstance, "homework-service/homework", values)
            .then(response => {
                attachFile(response.data.id)
            })
            .catch(error=>{
                console.log(error)
                setError("Cannot create this assignment")
                setSubmitting(false)
                setValues(values)
            })
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
        <div>
        <Formik
            initialValues={initial}
            validationSchema={validationSchema}
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
                                    options={allSubjects.toString().split(',')}
                                />


                                <DatepickerWrapper
                                name={"deadline"}
                                label={"Deadline"}
                                />
                                <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                                <div className="CreateForm__button-wrapper">
                                    <ButtonWrapper type="submit" label="Add" disabled={formik.isSubmitting} style={{margin:"5px"}}/>
                                </div>

                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
        </div>
    )
}

export default AssignEditHomeworkForm;

