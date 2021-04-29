import React, { useEffect, useState} from 'react';
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import MultipleSelectField from "../../../../components/MultipleSelectField/MultipleSelectField";
import Button from "../../../../components/Button/Button";
import * as Yup from "yup";

const init = {
    weight: 1,
    description: "",
    grade: "",
    studentID: "LSFKJNVLKJWNV",
}

const validationSchema = Yup.object({
    weight: Yup.number().required('Required'),
    grade: Yup.string().matches(/^[+-]?[1-6]$/, 'Invalid format').required('Required'),
})

const GradesCreateEditForm = () => {
    return (
        <Formik
            initialValues={init}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={values => console.log(values)}
        >
            {
                formik => {
                    return (
                        <Form>
                            <div className="CreateForm">
                                {formik.errors && formik.errors.submit &&
                                <div className="error">{formik.errors.submit}</div>}
                                <TextFieldWrapper
                                    label="Grade"
                                    name="grade"
                                    type="text"
                                />

                                <SelectFieldWrapper
                                    label="Weight"
                                    name='weight'
                                    options={[1,2,3,4,5,6]}
                                />

                                <TextFieldWrapper
                                    label="Description"
                                    name="description"
                                    type="text"
                                />


                                <input type={"hidden"} id={"studentID"}/>

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


export default GradesCreateEditForm;