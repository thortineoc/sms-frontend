import React, {useEffect, useState} from 'react';
import { Formik, Form } from 'formik';
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

const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
    console.log(values);
    try {
        await axios.put(".../{id}", values);
        resetForm();
        setStatus({success: true});
    } catch(error) {
        setStatus({success: false});
        setSubmitting(false);
        setErrors({submit: error.message});
    }
}

const validationSchema = Yup.object({
    id: Yup.string().required('Required'),
    userName: Yup.string().required('Required'),
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    pesel: Yup.string().matches(/^[0-9]{11}$/, 'Invalid format').required('Required'),
    customAttributes: Yup.object({
        phoneNumber: Yup.string().matches(/^[0-9]{5,15}$/, 'Invalid format. Please provide a number as 100200300'),
        email: Yup.string().email('Invalid format'),
        middleName: Yup.string(),
    })
})


const parent = {
    id: 3,
    userName: 'parent',
    email: 'iamparent@abc.com',
    phoneNumber: '555444333'
}


const EditForm = ({user, groups, role}) => {
    console.log(user)
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [items, setItems] = useState([]);

    useEffect(()=>{
        fetchItems();
    },[])
    const fetchItems = () => {
        callBackendGet(axiosInstance, "usermanagement-service/" + (role==="STUDENT" ? "groups" : "subjects"), null)
            .then(response => {
                console.log(response.data);
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
                                            name="customAttributes.email"
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
                <Formik
                    initialValues={parent}
                    validateOnChange={true}
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
                                                    {parent.id ?? '-'}
                                                </div>
                                            </div>
                                            <div className="Details__field">
                                                <div className="Details__label-sm">Username</div>
                                                <div className="Details__data-not-modifiable">
                                                    {parent.userName ?? '-'}
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
            )}
        </>
    )
}

export default EditForm;
