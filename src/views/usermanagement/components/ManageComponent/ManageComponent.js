import React, {useCallback, useEffect, useState} from 'react';
import "./ManageComponent.css"
import {Form, Formik} from "formik";
import axios from 'axios';
import {TrashIcon} from '@heroicons/react/solid'
import Button from "../../../../components/Button/Button";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import callBackendGet from "../../../../utilities/CallBackendGet";

const initialValues = {
    item: ''
}

const validationSchema = Yup.object({
    item: Yup.string().required('Required'),
})

const ManageComponent = (props) => {

    const [items, setItems] = useState();
    const [error, updateError] = useState(false);
    const [errorMessage, updateErrorMessage] = useState("")
    const {keycloak, initialized} = useKeycloak();

    // ### USAGE EXAMPLE ###
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    // const runBackend = useCallback((axiosInstance, url, data) => {
    //     if (!!initialized) {
    //         await callBackendGet(axiosInstance, url, setItems, data);
    //     }
    // }, [initialized]);


    // const fetchData =  () => {
    //     //runBackend(axiosInstance, "usermanagement-service/groups", null)
    //     console.log(items);
    //
    //     // if (response.status === 204) {
    //     //     updateError(true)
    //     //     return
    //     // } else if(response.status > 204){
    //     //     updateError(true)
    //     //     return
    //     // }
    //     // updateItems(response.data)
    // }

    useEffect( async () => {

        if (!!initialized) {
            callBackendGet(axiosInstance, "usermanagement-service/groups", setItems, null);
        }
    }, [initialized]);

    if(items)
    {
        console.log("HERE 2");
        console.log(items.data);
    }

    const onDelete = async (index) => {
        // updateErrorMessage("");
        // const itemsToUpdate = [...items]
        // let url = "http://52.142.201.18:24020/usermanagement-service/" + props.type + "/" + itemsToUpdate[index];
        //
        // const response = await axios.delete(url);
        // if (response.status === 204) {
        //     itemsToUpdate.splice(index, 1);
        //     updateItems(itemsToUpdate);
        // } else {
        //     updateErrorMessage("Cannot delete following item: " + itemsToUpdate[index].name);
        // }
    }

    const onSubmit = async (values, { resetForm}) => {
        // let itemsToUpdate = [...items]
        // if(itemsToUpdate.includes(values.item)){
        //     updateErrorMessage("This item already exists");
        // } else {
        //     let url = "http://52.142.201.18:24020/usermanagement-service/" + props.type + "/" + values.item;
        //     const response = await axios.post(url, JSON.stringify(values));
        //     if (response.status === 204) {
        //         resetForm();
        //         itemsToUpdate.push(values.item);
        //         updateItems(itemsToUpdate);
        //     } else {
        //         updateErrorMessage("Cannot add this item");
        //     }
        // }
    }

    if (error) {
        return (
            <div className="Component">
                <h1>Error!</h1>
            </div>
        )
    } else {
        return (
            <div className="Component">
                <h1>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</h1>
                {/*{errorMessage.length > 0 ? <p>{errorMessage}</p> : <></>}*/}
                {/*<table className="SubjectsTable">*/}
                {/*    <tbody>*/}
                {/*    {items.map((item, index) => (*/}
                {/*        <tr key={item}>*/}
                {/*            <td>{item}</td>*/}
                {/*            <td><TrashIcon onClick={() => onDelete(index)} style={{cursor: 'pointer', color: 'red'}}/>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    ))}*/}
                {/*    </tbody>*/}
                {/*</table>*/}

                {/*<Formik*/}
                {/*    initialValues={initialValues}*/}
                {/*    validationSchema={validationSchema}*/}
                {/*    validateOnChange={false}*/}
                {/*    onSubmit={onSubmit}*/}
                {/*>*/}
                {/*    {*/}
                {/*        formik => {*/}
                {/*            return (*/}
                {/*                <Form>*/}
                {/*                    <div>*/}
                {/*                        {formik.errors && formik.errors.submit &&*/}
                {/*                        <div className="error">{formik.errors.submit}</div>}*/}
                {/*                        <TextFieldWrapper*/}
                {/*                            label={"Add "+ props.type}*/}
                {/*                            name={"item"}*/}
                {/*                            type="text"*/}
                {/*                        />*/}
                {/*                        <div className="CreateForm__button-wrapper">*/}
                {/*                            <Button type="submit" label="Add"/>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </Form>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    }*/}
                {/*</Formik>*/}
            </div>
        );
    }
}

export default ManageComponent;