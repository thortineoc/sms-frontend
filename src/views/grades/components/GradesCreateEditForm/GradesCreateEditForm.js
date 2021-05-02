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

const init = (id, type) => {
    return(
        {
            weight: 1,
            description: "",
            grade: "",
            studentId: id,
            isFinal: (type === "FINAL"),
        }
    )

}

const convertGrade = (value) => {
    const grade = value.toString().split('.');
    if(grade[1] && grade[1] === '5') {
        grade[1] = '+';
    } else {
        grade[0] = parseInt(grade[0]) + 1;
        grade[1] = '-';
    }
    return grade.join('');
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

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() =>{
        if(props.existingGrade){
            props.existingGrade.grade=convertGrade(props.existingGrade.grade);
        }
        console.log(props.existingGrade)
    },[props.existingGrade])

    const fetchData = () => {
        callBackendGet(axiosInstance, "usermanagement-service/subjects", null)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => console.log(error))
    }

    const onSubmit = (values) =>{
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
        values.grade = newValue;
        console.log(values)
        callBackendPut(axiosInstance, "grades-service/grades", values)
            .then(response => {
                if(response.status<205){
                    props.setIsOpen(false)
                }
            })
            .catch(error => {
                setError("Cannot " + (props.type==="MODIFY" ? "modify" : "add") + " this grade");
                console.log(error)
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
            initialValues={(props.type === "MODIFY" ? props.existingGrade : init(props.newGradeStudentId, props.type))}
            validationSchema={validationSchema}
            validateOnChange={false}
            onSubmit={values => onSubmit(values)}
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