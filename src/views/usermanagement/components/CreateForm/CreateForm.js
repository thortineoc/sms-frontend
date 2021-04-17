import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './CreateForm.css';
import axios from 'axios';

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
    phone: Yup.string().matches(/^[0-9]+(-[0-9]+){2}(-[0-9]*){0,1}$/, 'Invalid format'),
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

                                <div className="CreateForm__control">
                                    <label htmlFor="firstName">First name</label>
                                    <Field type="text" id="firstName" name="firstName" />
                                    <ErrorMessage name="firstName">
                                        {errorMsg => <div className="error">{errorMsg}</div>}
                                    </ErrorMessage>
                                </div>

                                <div className="CreateForm__control">
                                    <label htmlFor="secondName">Second name</label>
                                    <Field type="text" id="secondName" name="secondName" />
                                    <ErrorMessage name="secondName">
                                        {errorMsg => <div className="error">{errorMsg}</div>}
                                    </ErrorMessage>
                                </div>

                                <div className="CreateForm__control">
                                    <label htmlFor="lastName">Last name</label>
                                    <Field type="text" id="lastName" name="lastName" />
                                    <ErrorMessage name="lastName">
                                        {errorMsg => <div className="error">{errorMsg}</div>}
                                    </ErrorMessage>
                                </div>

                                <div className="CreateForm__control">
                                    <label htmlFor="email">E-mail address</label>
                                    <Field type="email" id="email" name="email" />
                                    <ErrorMessage name="email">
                                        {errorMsg => <div className="error">{errorMsg}</div>}
                                    </ErrorMessage>
                                </div>

                                <div className="CreateForm__control">
                                    <label htmlFor="phone">Phone number</label>
                                    <Field type="text" id="phone" name="phone" placeholder="ex. 500-500-500"/>
                                    <ErrorMessage name="phone">
                                        {errorMsg => <div className="error">{errorMsg}</div>}
                                    </ErrorMessage>
                                </div>

                                <div className="CreateForm__control">
                                    <label htmlFor="dateOfBirth">Date of birth</label>
                                    <Field type="date" id="dateOfBirth" name="dateOfBirth" />
                                    <ErrorMessage name="dateOfBirth">
                                        {errorMsg => <div className="error">{errorMsg}</div>}
                                    </ErrorMessage>
                                </div>

                                <button type="submit" disabled={formik.isSubmitting} className="CreateForm__submit">
                                    Submit
                                </button>
                                {formik.errors && formik.errors.submit && <div className="error">{formik.errors.submit}</div>}
                            </div>
                        </Form>
                    )
                }
            }

        </Formik>
    );
};

export default CreateForm;
