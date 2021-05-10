import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import React from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    userName: Yup.string().required('Required'),
    //custom
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300').nullable(),
        email: Yup.string().email('Invalid format').nullable(),
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