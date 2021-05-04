import React, { useEffect, useState} from 'react';
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";
import useAxios from "../../../../utilities/useAxios";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import callBackendPut from "../../../../utilities/CallBackendPut";
import callBackendDelete from "../../../../utilities/CallBackendDelete";

const init = (id, type, subject) => {
    return(
        {
            weight: 1,
            description: "",
            grade: "",
            studentId: id,
            isFinal: (type === "FINAL" ? true : false),
            subject: subject,
        }
    )

}

const convertGradeToString = (gradeObject) => {
    let newGradeObject = Object.assign({}, gradeObject);
    const gradeArr = newGradeObject.grade.toString().split('.');
    if(gradeArr[1] && gradeArr[1] === '5') {
        gradeArr[1] = '+';
    } else if(gradeArr[1]){
        gradeArr[0] = parseInt(gradeArr[0]) + 1;
        gradeArr[1] = '-';
    } else{
        gradeArr[0] = parseInt(gradeArr[0])
    }
    newGradeObject.grade=gradeArr.join('');
    return newGradeObject;
}

const convertGradeToDouble = (gradeObject) =>{
    let newGradeObject = Object.assign({}, gradeObject);
    let newValue = 0.0;
    if(newGradeObject.grade.length === 2){
        if(newGradeObject.grade.slice(1)==="+"){
            newValue+=0.5;
        } else {
            newValue-=0.25;
        }
        newValue+=parseInt(newGradeObject.grade.slice(0,1), 10)
    } else {
        newValue+=parseInt(newGradeObject.grade.slice(0), 10)
    }
    newGradeObject.grade = newValue;
    return newGradeObject;
}

const validationSchema = Yup.object({
    weight: Yup.number().required('Required'),
    grade: Yup.string().matches(/^[1-6][+-]?$/, 'Invalid format').required('Required'),
    subject: Yup.string().required('Required'),
})

const GradesCreateEditForm = (props) => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [error, setError] = useState("");
    console.log(props.existingGrade);
    const onSubmit = (values, setSubmitting, setValues) =>{
        setError("");
        console.log(convertGradeToDouble(values));
        callBackendPut(axiosInstance, "grades-service/grades", convertGradeToDouble(values))
            .then(response => {
                if(response.status<205){
                    props.setIsOpen(false)
                }
            })
            .catch(error => {
                setError("Cannot " + (props.type==="MODIFY" ? "modify" : "add") + " this grade");
                console.log(error)
                setSubmitting(false);
                setValues(values)
            })
    }

    const onDelete = (values) =>{
        callBackendDelete(axiosInstance, "grades-service/grades/" + values.id, null)
            .then(response => {
                if(response.status<205){
                    props.setIsOpen(false)
                }
            })
            .catch(error => {
                setError("Cannot delete this grade")
                console.log(error)
            })
    }

    return (
        <Formik
            initialValues={(props.type === "MODIFY" ? convertGradeToString(props.existingGrade) : init(props.newGradeStudentId, props.type, props.subject))}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={(values, {setSubmitting, setValues}) => onSubmit(values, setSubmitting, setValues)}
            onReset={values => onDelete(values)}
        >
            {
                formik => {
                    return (
                        <Form>
                            <h3>{(props.type==="MODIFY" ? (props.existingGrade.isFinal===true ? "Modify final" : "Modify regular") : (props.type==="FINAL" ? "Add final" : "Add regular")) + " grade"}</h3>
                            {(error.length>0 ? <p>{error}</p> : <div/>)}
                            <div className="CreateForm">
                                {formik.errors && formik.errors.submit &&
                                <div className="error">{formik.errors.submit}</div>}
                                <TextFieldWrapper
                                    label="Grade"
                                    name="grade"
                                    type="text"
                                />
                                {((props.type === "MODIFY" && props.existingGrade.isFinal===false ) || (props.type === "REGULAR" ) ) &&
                                <SelectFieldWrapper
                                    label="Weight"
                                    name='weight'
                                    options={[1,2,3,4,5,6]}
                                />}

                                <TextFieldWrapper
                                    label="Description"
                                    name="description"
                                    type="text"
                                />


                                <div className="CreateForm__button-wrapper">
                                    {props.type==="MODIFY"
                                        && <ButtonWrapper type="reset" label="Delete" disabled={formik.isSubmitting} style={{margin:"5px"}}/>}
                                    <ButtonWrapper type="submit" label={(props.type==="MODIFY" ? "Save" : "Add")} disabled={formik.isSubmitting} style={{margin:"5px"}}/>
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