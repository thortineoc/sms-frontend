import React, {useState} from "react";
import "./AddEditReview.css"
import {Form, Formik} from "formik";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import DatepickerWrapper from "../../../../components/DatepickerWrapper/DatepickerWrapper";
import {Grid, IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import UploadFile from "../../../../components/UploadFIle/UploadFile";

const AddEditReview = (props) => {
    console.log(props.row)
    const [showEdit, setShowEdit] = useState(props.row.answer.review===null)

    const getEditForm = () =>{
        return (
            <>
            <h3>Edit review for {props.row.student.firstName} {props.row.student.lastName}</h3>
        <Formik
            initialValues={props.row.answer}
            //validationSchema={validationSchema}
            validateOnChange={false}
            //onSubmit={(values, setSubmitting, setValues) => updateHomework(values, setSubmitting, setValues)}
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
                            <ButtonWrapper type="submit" label="Save" disabled={formik.isSubmitting} style={{float: "right", marginTop: "2%"}}/>
                        </Form>
                    )
                }
            }
        </Formik>
                </>
        )
    }

    const getShowForm = () =>{
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