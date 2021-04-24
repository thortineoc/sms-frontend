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

    const [array, setArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Loading...")
    const {keycloak, initialized} = useKeycloak();
    const axiosInstance = useAxios('http://52.142.201.18:24020/');

    useEffect( () => {
        fetchData();
    }, [initialized]);

    const fetchData = () => {
            callBackendGet(axiosInstance, "usermanagement-service/" + props.type, null)
                .then(response => {
                    if (response.status === 200) {
                        setArray(response.data)
                        setErrorMessage("");
                    } else if(response.status === 204) {
                        setErrorMessage("There are no items.");
                        setArray([])
                    } else{
                        setErrorMessage("There was an error during fetching the data.");
                    }
                })
                .catch(error => console.log(error))
    }

    const onDelete = async (index) => {
        const itemsToUpdate = [...array]
        setErrorMessage("");
        callBackendDelete(axiosInstance, "usermanagement-service/" + props.type + "/" + itemsToUpdate[index], null)
            .then(response => {
                if (response.status === 204) {
                    setErrorMessage("");
                    fetchData();
                } else {
                    setErrorMessage("Cannot delete this item.");
                }
            })
            .catch(error => console.log(error))
    }

    const onSubmit = async (values, {resetForm}) => {
        let itemsToUpdate = [...array]
        if (itemsToUpdate.includes(values.item)) {
            resetForm();
            setErrorMessage("This item already exists.");
        } else {
            setErrorMessage("");
            callBackendPost(axiosInstance, "usermanagement-service/" + props.type + "/" + values.item, null)
                .then(response => {
                    if (response.status === 204) {
                        setErrorMessage("");
                        fetchData();
                    } else {
                        setErrorMessage("There was an error during creating this item.");
                    }
                })
                .catch(error => console.log(error))

            resetForm();
        }
    }


    return (
        <div className="Component">
            <h1>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</h1>
            <p>{errorMessage}</p>
            <table className={"ItemTable"}>
                <tbody>
                {array.map((item, index) => (
                    <tr key={item}>
                        <td>{item}</td>
                        <td><TrashIcon onClick={() => onDelete(index)} className={"Icon"}/>
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
                            <Form className={"NewItemForm"}>
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