import React, { useEffect, useState} from 'react';
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";
import * as Yup from "yup";
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";

const init = (id, type) => {
    return(
        {
            weight: 1,
            description: "",
            grade: "",
            studentId: id,
            type: type,
        }
    )

}

const validationSchema = Yup.object({
    weight: Yup.number().required('Required'),
    grade: Yup.string().matches(/^[+-]?[1-6]$/, 'Invalid format').required('Required'),
})

const GradesCreateEditForm = (props) => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        callBackendGet(axiosInstance, "usermanagement-service/subjects", null)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => console.log(error))
    }
    return (
        <Formik
            initialValues={(props.type === "MODIFY" ? props.existingGrade : init(props.newGradeStudentId, props.type))}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={values => console.log(values)}
            onReset={() => console.log("delete")}
        >
            {
                formik => {
                    return (
                        <Form>
                            <h3>{(props.type==="MODIFY" ? "Modify" : (props.type==="FINAL" ? "Add final" : "Add regular")) + " grade"}</h3>
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

                                <SelectFieldWrapper
                                    label="Subject"
                                    name="subject"
                                    options={items}
                                />

                                <TextFieldWrapper
                                    label="Description"
                                    name="description"
                                    type="text"
                                />


                                <div className="CreateForm__button-wrapper">
                                    {props.type==="MODIFY"
                                        && <Button type="reset" label="Delete" disabled={formik.isSubmitting} style={{margin:"5px"}}/>}
                                    <Button type="submit" label={(props.type==="MODIFY" ? "Save" : "Add")} disabled={formik.isSubmitting} style={{margin:"5px"}}/>
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