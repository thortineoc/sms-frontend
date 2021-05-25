import React, {useState} from "react";
import "./AddEditReview.css"
import {Form, Formik} from "formik";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";
import callBackendPut from "../../../../utilities/CallBackendPut";
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";

const validationSchema = Yup.object({
    review: Yup.string().required('Required'),
})


const AddEditReview = (props) => {
    console.log(props.row)
    const [showEdit, setShowEdit] = useState(props.row.answer.review === null)
    const axiosInstance = useAxios(smsConfig.haproxyUrl);


    const updateReview = (values, setSubmitting, setValues) => {
        callBackendPut(axiosInstance, "homework-service/answer/", values)
            .then(response => {
                console.log("ok")
                props.setShow(false)
                props.setRefresh(true)
            })
            .catch(error => {
                console.log(error)
            })
    }


    const getEditForm = () => {
        return (
            <>
                <h3>Edit review for {props.row.student.firstName} {props.row.student.lastName}</h3>
                <Formik
                    initialValues={props.row.answer}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    onSubmit={(values, setSubmitting, setValues) => updateReview(values, setSubmitting, setValues)}
                >
                    {
                        formik => {
                            return (
                                <Form>
                                    <div>
                                        {formik.errors && formik.errors.submit &&
                                        <div className="error">{formik.errors.submit}</div>}

                                        <TextFieldWrapper
                                            label="Review"
                                            name="review"
                                            type="text"
                                            style={{marginBottom: "2%", width: "100%"}}
                                        />

                                    </div>
                                    <ButtonWrapper type="submit" label="Save" disabled={formik.isSubmitting}
                                                   style={{float: "right", marginTop: "2%"}}/>
                                </Form>
                            )
                        }
                    }
                </Formik>
            </>
        )
    }

    const getShowForm = () => {
        return (
            <>
                <h3>Review for {props.row.student.firstName} {props.row.student.lastName}</h3>
                <div className="Review__field">
                    <div className="Review__data" onClick={() => setShowEdit(true)} style={{cursor: "pointer"}}>
                        {props.row.answer.review}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {showEdit ? getEditForm() : getShowForm()}
        </>
    )
}

export default AddEditReview