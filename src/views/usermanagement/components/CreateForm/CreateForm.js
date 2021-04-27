import React, {useEffect, useState} from 'react';
import {Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup';
import './CreateForm.css';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import MultipleSelectField from "../../../../components/MultipleSelectField/MultipleSelectField";
import {useKeycloak} from "@react-keycloak/web";
import callBackendPost from "../../../../utilities/CallBackendPost";
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";

const initialValues = {
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    role: 'STUDENT',
    pesel: '',
    customAttributes: {
        email: '',
        group: '',
        phoneNumber: '',
        middleName: '',
        subjects: []
    }
}

const subjects = [
    'geography',
    'chemistry',
    'french'
]

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

const CreateForm = ({type, setCreateUserModalShown}) => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        callBackendGet(axiosInstance, "usermanagement-service/" + (type==="STUDENT" ? "groups" : "subjects"), null)
            .then(response => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch(error => console.log(error))
    }

    const onSubmit = (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
        callBackendPost(  axiosInstance,
                     "usermanagement-service/users",
                          JSON.stringify(values))
                .then(response => console.log(response))
                .catch(error => {
                    setStatus({success: false});
                    setSubmitting(false);
                    setErrors({submit: error.message});
                });
        resetForm();
        setStatus({success: true});
        setCreateUserModalShown(false);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {
                formik => {
                    return (
                        <Form>
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
                                {type === 'STUDENT' &&
                                <SelectFieldWrapper
                                    label="Group"
                                    name="customAttributes.group"
                                    options={items}
                                />}

                                {type === 'TEACHER' &&
                                <MultipleSelectField
                                    label="Subjects"
                                    name='customAttributes.subjects'
                                    options={items}
                                />}

                                <div className="CreateForm__button-wrapper">
                                    <Button type="submit" label="Submit" disabled={formik.isSubmitting}/>
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
