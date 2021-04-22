import React, {useState} from 'react';
import {Formik, Form, FieldArray} from 'formik';
import * as Yup from 'yup';
import './CreateForm.css';
import axios from 'axios';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import SelectMultipleFieldWrapper from "../../../../components/SelectMultipleFieldWrapper/SelectMultipleFieldWrapper";
import MultipleSelectField from "../../../../components/testowy/MultipleSelectField";

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

const groups = [
    "",
    "1A",
    "1B",
    "1C",
]

const subjects = [
    'geography',
    'chemistry',
    'french'
]

const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
    console.log(JSON.stringify(values));
    try {
        await axios
            .post(
                "http://52.142.201.18:24020/usermanagement-service/users",
                JSON.stringify(values), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
        resetForm();
        setStatus({success: true});
    } catch(error) {
        setStatus({success: false});
        setSubmitting(false);
        setErrors({submit: error.message});
    }
}

const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    //dateOfBirth: Yup.date().max(new Date(), 'Invalid date').required('Required'),
    email: Yup.string().email('Invalid format'),
    pesel: Yup.string().matches(/^[0-9]{11}$/, 'Invalid format').required('Required'),
    middleName: Yup.string(),
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300'),
    })
})

const CreateForm = () => {
    const [subjects, setSubjects] = useState([]);

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
                                <SelectFieldWrapper
                                    label="Group"
                                    name="group"
                                    options={groups}
                                />
                                {/*
                                <SelectMultipleFieldWrapper
                                    label="Subjects"
                                    name="customAttributes.subjects"
                                    options={subjects}
                                />*/}

                                <MultipleSelectField
                                    name="customAttributes.subjects"
                                    options={subjects}
                                />

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
