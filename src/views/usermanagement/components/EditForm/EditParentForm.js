import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import React from "react";
import * as Yup from "yup";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect";
import useAxios from "../../../../utilities/useAxios";
import callBackendPut from "../../../../utilities/CallBackendPut";

const validationSchemaParent = Yup.object({
    id: Yup.string(),//.required('Required'), //wtf formik
    userName: Yup.string(),//.required('Required'), //wtf formik
    firstName: Yup.string(),//.required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid format'),
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300')
    })
})

const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    userName: Yup.string().required('Required'),
    //firstName: Yup.string().required('Required'),
    //lastName: Yup.string().required('Required'),
    //pesel: Yup.string().matches(/^[0-9]{11}$/, 'Invalid format').required('Required'),
    email: Yup.string().email('Invalid format'),
    //custom
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300'),
        //middleName: Yup.string(),
        //groups: Yup.string()
    })
})

const ParentForm = ({user, refresh, onSubmit}) => {

    if(Object.keys(user).length === 0)
    {
        return ("Please wait. We're doing our best :)");
    }

    return (
        <>
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

                                    <h3>Parent contact information</h3>
                                    <div className="Details__parent-grid">
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
                                        <div className="Details__field">
                                            <div className="Details__label-sm">User ID</div>
                                            <div className="Details__data-not-modifiable">
                                                {user.id ?? '-'}
                                            </div>
                                        </div>
                                        <div className="Details__field">
                                            <div className="Details__label-sm">Username</div>
                                            <div className="Details__data-not-modifiable">
                                                {user.userName ?? '-'}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="EditForm__button-wrapper">
                                        <ButtonWrapper type="submit" label="Save parent changes"
                                                       disabled={formik.isSubmitting}/>
                                    </div>

                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </>
    )
}

export default ParentForm;