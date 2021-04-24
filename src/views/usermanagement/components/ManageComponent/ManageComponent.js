import React, { useEffect, useState} from 'react';
import "./ManageComponent.css"
import {Form, Formik} from "formik";
import {TrashIcon} from '@heroicons/react/solid'
import Button from "../../../../components/Button/Button";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import callBackendGet from "../../../../utilities/CallBackendGet";
import callBackendDelete from "../../../../utilities/CallBackendDelete";

const initialValues = {
    item: ''
}

const validationSchema = Yup.object({
    item: Yup.string().required('Required'),
})

const ManageComponent = (props) => {

    const [getResponse, setGetResponse] = useState();
    const [deleteResponse, setDeleteResponse] = useState();
    const [postResponse, setPostResponse] = useState();
    const [array, setArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Loading...")
    const {keycloak, initialized} = useKeycloak();
    const axiosInstance = useAxios('http://52.142.201.18:24020/');


    useEffect(async () => {
        fetchData();
    }, [initialized]);


    const fetchData = () => {
        console.log("fetch")
        if (!!initialized) {
            callBackendGet(axiosInstance, "usermanagement-service/groups", setGetResponse, null);
        }
    }

    if (getResponse) {
        if (getResponse.status === 200) {
            setArray(getResponse.data)
            setErrorMessage("");
        } else if(getResponse.status === 204) {
            setErrorMessage("There are no items.");
            setArray([])
        }
        setGetResponse(undefined);
    }

    const onDelete = async (index) => {

        let url = "http://52.142.201.18:24020/usermanagement-service/" + props.type + "/";
        const itemsToUpdate = [...array]
        setErrorMessage("");
        callBackendDelete(axiosInstance, "usermanagement-service/groups/" + itemsToUpdate[index], setDeleteResponse, null);
    }

    if (deleteResponse) {
        if (deleteResponse.status === 204) {
            setErrorMessage("");
            fetchData();
        } else {
            setErrorMessage("Cannot delete this item.");
        }
        setDeleteResponse(undefined);
    }


    const onSubmit = async (values, {resetForm}) => {
        let itemsToUpdate = [...array]
        if (itemsToUpdate.includes(values.item)) {
            resetForm();
            setErrorMessage("This item already exists.");
        } else {
            setErrorMessage("");
            callBackendPost(axiosInstance, "usermanagement-service/groups/" + values.item, setPostResponse, null);
            resetForm();
        }
    }

    if (postResponse) {
        if (postResponse.status === 204) {
            setErrorMessage("");
            fetchData();
        } else {
            setErrorMessage("There was an error during creating this item.");
        }
        setPostResponse(undefined);
    }


    return (
        <div className="Component">
            <h1>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</h1>
            <p>{errorMessage}</p>
            <table className="SubjectsTable">
                <tbody>
                {array.map((item, index) => (
                    <tr key={item}>
                        <td>{item}</td>
                        <td><TrashIcon onClick={() => onDelete(index)}
                                       style={{cursor: 'pointer', color: 'red'}}/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>


            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                onSubmit={onSubmit}
            >
                {
                    formik => {
                        return (
                            <Form>
                                <div>
                                    {formik.errors && formik.errors.submit &&
                                    <div className="error">{formik.errors.submit}</div>}
                                    <TextFieldWrapper
                                        label={"Add " + props.type}
                                        name={"item"}
                                        type="text"
                                    />
                                    <div className="CreateForm__button-wrapper">
                                        <Button type="submit" label="Add"/>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>


        </div>
    )

}


export default ManageComponent;