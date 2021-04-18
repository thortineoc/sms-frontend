import React, {useEffect} from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";

let initialValues = {
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
        await axios.post("/usr/{id}", values);
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

const user = {
    firstName: 'Joe',
    lastName: 'Doe',
    dateOfBirth: '2000-11-11',
    group: '1A'
}

const EditForm = ({id}) => {
    useEffect(async () => {
            initialValues = await user;
    }, []);

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
                            <div className="CreateForm">
                                {formik.errors && formik.errors.submit &&
                                <div className="error">{formik.errors.submit}</div>}
                                <TextFieldWrapper
                                    label="First name"
                                    name="firstName"
                                    type="text"
                                />
                                <TextFieldWrapper
                                    label="Second name"
                                    name="secondName"
                                    type="text"
                                />
                                <TextFieldWrapper
                                    label="Last name"
                                    name="lastName"
                                    type="text"
                                />
                                <TextFieldWrapper
                                    label="E-mail address"
                                    name="email"
                                    type="email"
                                />
                                <TextFieldWrapper
                                    label="Phone number"
                                    name="phone"
                                />
                                <TextFieldWrapper
                                    label="Date of birth"
                                    name="dateOfBirth"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    defaultValue={user.dateOfBirth}
                                />

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
};

export default EditForm;
