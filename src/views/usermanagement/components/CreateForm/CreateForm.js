import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CreateForm.css';
import axios from 'axios';
import FormControl from "./FormControl";
import DateFormControl from "./DateFormControl";
import Button from "../../../../components/Button/Button";

const initialValues = {
    firstName: '',
    secondName: '',
    lastName: '',
    dateOfBirth: '', //?
    email: '',
    phone: '',
    group: '', //?
    role: '' //?
}

const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
    console.log(values);
    try {
        await axios.post("/send", values);
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
    secondName: Yup.string(),
    lastName: Yup.string().required('Required'),
    dateOfBirth: Yup.date().max(new Date(), 'Invalid date').required('Required'),
    email: Yup.string().email('Invalid format'),
    phone: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300'),
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
                            <div className="CreateForm__container">

                                {formik.errors && formik.errors.submit && <div className="error">{formik.errors.submit}</div>}

                                <FormControl label="First name" name="firstName" type="text" isRequired={true} />
                                <FormControl label="Second name" name="secondName" type="text" isRequired={false} />
                                <FormControl label="Last name" name="lastName" type="text" isRequired={true} />
                                <FormControl label="E-mail address" name="email" type="email" isRequired={false} />
                                <FormControl label="Phone number" name="phone" type="text" isRequired={false} />
                                <DateFormControl label="Date of birth" name="dateOfBirth" type="date" isRequired={true} />

                                <div className="CreateForm__button-wrapper">
                                    <Button type="submit" label="Submit" disabled={formik.isSubmitting} />
                                </div>

                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    );
};

export default CreateForm;
