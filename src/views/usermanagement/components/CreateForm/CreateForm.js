import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import './CreateForm.css';
import axios from 'axios';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";
/*import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";*/

const initialValues = {
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    role: 'STUDENT',
    pesel: '',
    customAttributes: {
        email: '',
        group: '1A',
        phoneNumber: '',
        middleName: '',
        subjects: []
    }
}

const groups = [
    "1A",
    "1B",
    "1C",
    "1Z"
]

const subjects = [
    'geography',
    'chemistry',
    'french'
]

const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
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
                                {formik.values.role === 'TEACHER' && (
                                    <SelectFieldWrapper
                                        label="Subjects"
                                        name="customAttributes.subjects"
                                        options={subjects}
                                        multiple
                                    />
                                )}*/}

                                {/*
                                <TextFieldWrapper
                                    label="Date of birth"
                                    name="dateOfBirth"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                                */}

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
