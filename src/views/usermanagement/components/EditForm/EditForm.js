import React, {useEffect} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import '../Details/Details.css';

const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
    console.log(values);
    try {
        await axios.put(".../{id}", values);
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
    email: Yup.string().email('Invalid format'),
    phone: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300'),
})

const EditForm = ({user, groups}) => {
    // fetch user data and groups
    return (
        <Formik
            initialValues={user}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={onSubmit}
        >
            {
                formik => {
                    return (
                        <Form>
                            <div className="EditForm">
                                {formik.errors && formik.errors.submit &&
                                <div className="error">{formik.errors.submit}</div>}

                                <h3>Personal information</h3>
                                <div className="Details__student-grid">
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
                                        label="PESEL* "
                                        name="pesel"
                                        type="text"
                                    />
                                    <TextFieldWrapper
                                        label="E-mail address"
                                        name="customAttributes.email"
                                        type="email"
                                    />
                                    <TextFieldWrapper
                                        label="Phone number"
                                        name="customAttributes.phoneNumber"
                                        type="text"
                                    />
                                    <TextFieldWrapper
                                        label="User Id"
                                        name="id"
                                        type="text"
                                    />
                                    <TextFieldWrapper
                                        label="Username"
                                        name="userName"
                                        type="text"
                                    />
                                    <SelectFieldWrapper
                                        name="group"
                                        label="Group"
                                        options={groups}
                                    />
                                </div>

                                <h3>Parent contact information</h3>
                                <div className="Details__parent-grid">
                                    <TextFieldWrapper
                                        label="E-mail address"
                                        name="customAttributes.email"
                                        type="email"
                                    />
                                    <TextFieldWrapper
                                        label="Phone number"
                                        name="customAttributes.phoneNumber"
                                        type="text"
                                    />
                                    <TextFieldWrapper
                                        label="User Id"
                                        name="id"
                                        type="text"
                                    />
                                    <TextFieldWrapper
                                        label="Username"
                                        name="userName"
                                        type="text"
                                    />
                                </div>


                                <div className="CreateForm__button-wrapper">
                                    <Button type="submit" label="Save changes" disabled={formik.isSubmitting}/>
                                </div>

                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    );
}

export default EditForm;
