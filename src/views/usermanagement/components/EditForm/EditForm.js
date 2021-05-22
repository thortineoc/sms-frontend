import React, {useEffect, useState} from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import '../Details/Details.css';
import './EditForm.css'
import MultipleSelect from "../../../../components/MultipleSelect/MultipleSelect";
import callBackendGet from "../../../../utilities/CallBackendGet";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import callBackendPut from "../../../../utilities/CallBackendPut";
import {responsiveFontSizes} from "@material-ui/core";
import ParentForm from "./EditParentForm";
import smsConfig from "../../../../utilities/configuration";

const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    userName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    pesel: Yup.string().matches(/^[0-9]{11}$/, 'Invalid format').required('Required'),
    //custom
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300'),
        middleName: Yup.string(),
        groups: Yup.string(),
        email: Yup.string().email('Invalid format'),
    })
})

const EditForm = ({user, groups, role, refresh, setShowEdit, setDetailsModalShown}) => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [items, setItems] = useState([]);
    const [parent, setParent] = useState({});

    const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
        callBackendPut(axiosInstance, "usermanagement-service/users/update", {
            ...values
        })
            .then(response => {
                setStatus({success: true});
                setShowEdit(false);
                setDetailsModalShown(false);
                refresh(true);
            })
            .catch(error => {
                console.log(error);
                setStatus({success: false});
                setSubmitting(false);
                resetForm();
                setErrors({submit: error.message});
            });
    }

    useEffect(() => {
        fetchItems();
        if (role === "STUDENT") {
            callBackendGet(axiosInstance, "usermanagement-service/users/" + user.relatedUser, null)
                .then(response => {
                    setParent(response.data);
                })
                .catch(error => console.log(error));
        }
    }, [])

    useEffect(() => {
        if(role==="TEACHER"){
            const index=user.customAttributes.subjects.indexOf("");
            if (index > -1) {
                user.customAttributes.subjects.splice(index, 1);
            }
        }
    },[])
    const fetchItems = () => {
        callBackendGet(axiosInstance, "usermanagement-service/" + (role === "STUDENT" ? "groups" : "subjects"), null)
            .then(response => {
                setItems(response.data);
            })
            .catch(error => console.log(error))
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

                                    <h3>Personal information</h3>
                                    <div className="Details__student-grid">
                                        <TextFieldWrapper
                                            label="First name *"
                                            name="firstName"
                                            type="text"
                                        />
                                        <TextFieldWrapper
                                            label="Middle name"
                                            name="customAttributes.middleName"
                                            type="text"
                                        />
                                        <TextFieldWrapper
                                            label="Last name *"
                                            name="lastName"
                                            type="text"
                                        />
                                        <div className="Details__field">
                                            <div className="Details__label-sm">PESEL</div>
                                            <div className="Details__data-not-modifiable">
                                                {user.pesel ?? '-'}
                                            </div>
                                        </div>
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
                                        {role === 'STUDENT' && (
                                            <SelectFieldWrapper
                                                label="Group"
                                                name="customAttributes.group"
                                                options={items}
                                            />)}
                                    </div>
                                    {role === 'TEACHER' && (
                                        <div className="EditForm__subjects">
                                            <MultipleSelect
                                                label="Subjects"
                                                name="customAttributes.subjects"
                                                options={items}
                                                initialValues={user.customAttributes.subjects}
                                            />
                                        </div>
                                    )}
                                    <div className="EditForm__button-wrapper">
                                        <ButtonWrapper type="submit" label={"Save " + role.toLowerCase() + " changes"}
                                                       disabled={formik.isSubmitting}/>
                                    </div>

                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>

            {role === 'STUDENT' && (
                <ParentForm
                user={parent}
                onSubmit={onSubmit}
                refresh={refresh}/>
            )}
        </>
    )
}

export default EditForm;
