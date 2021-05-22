import React, {useEffect, useState} from 'react';
import {Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup';
import './CreateForm.css';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import MultipleSelectField from "../../../../components/MultipleSelectField/MultipleSelectField";
import {useKeycloak} from "@react-keycloak/web";
import callBackendPost from "../../../../utilities/CallBackendPost";
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect";
import smsConfig from "../../../../utilities/configuration";

const initialValues = (role) => {
    return {
        id: '',
        userName: '',
        firstName: '',
        lastName: '',
        role: role,
        pesel: '',
        customAttributes: {
            email: '',
            group: '',
            phoneNumber: '',
            middleName: '',
            subjects: []
        }
    }
}


const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    pesel: Yup.string().matches(/^[0-9]{11}$/, 'Invalid format').required('Required'),
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300'),
        email: Yup.string().email('Invalid format'),
        middleName: Yup.string(),
    })
})

const CreateForm = ({role, setCreateUserModalShown, requireRefresh}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [items, setItems] = useState([]);

    useEffect(() => {
        console.log(initialValues(role))
        fetchData();
    }, [])

    const fetchData = () => {
        callBackendGet(axiosInstance, "usermanagement-service/" + (role==="STUDENT" ? "groups" : "subjects"), null)
            .then(response => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch(error => console.log(error))
    }

    const onSubmit = (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
        console.log(JSON.stringify(values))
        callBackendPost(  axiosInstance,
                     "usermanagement-service/users",
                          JSON.stringify(values))
                .then(response => {
                    if(response.status===204){
                        requireRefresh()
                        setCreateUserModalShown(false)
                        console.log(response)
                    } else {
                        setStatus({success: false});
                        setSubmitting(false);
                        setErrors({submit: "Cannot create this user"});
                    }
                })
                .catch(error => {
                    setStatus({success: false});
                    setSubmitting(false);
                    setErrors({submit: "Cannot create this user"});
                });
        resetForm();
    }

    return (
        <Formik
            initialValues={initialValues(role)}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {
                formik => {
                    return (
                        <Form>
                            <h3 style={{margin: "1px"}}>{"Create new " + role.toLowerCase()}</h3>
                            <div className="CreateForm">
                                {formik.errors && formik.errors.submit &&
                                <div className="error">{formik.errors.submit}</div>}
                                <TextFieldWrapper
                                    label="First name *"
                                    name="firstName"
                                    type="text"
                                />
                                <TextFieldWrapper
                                    label="Middle name"
                                    name="customAttributes.middleName"
                                    type="text"
                                />
                                <TextFieldWrapper
                                    label="Last name *"
                                    name="lastName"
                                    type="text"
                                />
                                <TextFieldWrapper
                                    label="PESEL *"
                                    name="pesel"
                                    type="pesel"
                                />
                                <TextFieldWrapper
                                    label="E-mail address"
                                    name="email"
                                    type="email"
                                />
                                <TextFieldWrapper
                                    label="Phone number"
                                    name="customAttributes.phoneNumber"
                                    type="text"
                                />
                                {role === 'STUDENT' &&
                                <SelectFieldWrapper
                                    label="Group"
                                    name="customAttributes.group"
                                    options={items}
                                />}

                                {role === 'TEACHER' &&
                                <MultipleSelect
                                    label="Subjects"
                                    name="customAttributes.subjects"
                                    options={items}
                                />}

                                <div className="CreateForm__button-wrapper">
                                    <ButtonWrapper type="submit" label="Submit" disabled={formik.isSubmitting}/>
                                </div>

                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default CreateForm;
