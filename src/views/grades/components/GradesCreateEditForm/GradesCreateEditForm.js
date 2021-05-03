import React, { useEffect, useState} from 'react';
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";
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
            isFinal: (type === "FINAL"),
            subject: subject,
        }
    )

}

const convertGrade = (existing) => {
    let e = Object.assign({}, existing);
    const gradeArr = e.grade.toString().split('.');
    if(gradeArr[1] && gradeArr[1] === '5') {
        gradeArr[1] = '+';
    } else if(gradeArr[1]){
        gradeArr[0] = parseInt(gradeArr[0]) + 1;
        gradeArr[1] = '-';
    } else{
        gradeArr[0] = parseInt(gradeArr[0])
    }
    e.grade=gradeArr.join('');

    return e;
}

const validationSchema = Yup.object({
    weight: Yup.number().required('Required'),
    grade: Yup.string().matches(/^[1-6][+-]?$/, 'Invalid format').required('Required'),
    subject: Yup.string().required('Required'),
})

const GradesCreateEditForm = (props) => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");

    /*
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

     */

    const onSubmit = (values, setSubmitting, setValues) =>{
        setError("");
        let newValue = 0.0;
        if(values.grade.length === 2){
            if(values.grade.slice(1)==="+"){
                newValue+=0.5;
            } else {
                newValue-=0.25;
            }
            newValue+=parseInt(values.grade.slice(0,1), 10)
        } else {
            newValue+=parseInt(values.grade.slice(0), 10)
        }
        let updatedValues = Object.assign({}, values);
        updatedValues.grade = newValue;
        console.log(newValue)
        console.log(updatedValues)
        callBackendPut(axiosInstance, "grades-service/grades", updatedValues)
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
            initialValues={(props.type === "MODIFY" ? convertGrade(props.existingGrade) : init(props.newGradeStudentId, props.type, "Math"))}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={(values, {setSubmitting, setValues}) => onSubmit(values, setSubmitting, setValues)}
            onReset={values => onDelete(values)}
        >
            {
                formik => {
                    return (
                        <Form>
                            <h3>{(props.type==="MODIFY" ? "Modify" : (props.type==="FINAL" ? "Add final" : "Add regular")) + " grade"}</h3>
                            {(error.length>0 ? <p>{error}</p> : <div/>)}
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