import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import React from "react";
import * as Yup from "yup";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect";

const validationSchemaParent = Yup.object({
    id: Yup.string(),
    userName: Yup.string(),
    email: Yup.string().email('Invalid format'),
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300')
    })
})

const ParentForm = ({user}) => {

    const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
        console.log(values);
        // callBackendPut(axiosInstance, "usermanagement-service/users/update", {
        //     ...values
        // })
        //     .then(response => {
        //         console.log(response);
        //         setStatus({success: true});
        //         refresh(true);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         setStatus({success: false});
        //         setSubmitting(false);
        //         resetForm();
        //         setErrors({submit: error.message});
        //     });
    }

    return (
        <>
            <Formik
                initialValues={user}
                validationSchema={validationSchemaParent}
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
                                            name="phoneNumber"
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