import React, {useEffect, useState} from 'react';
import "./ManageComponent.css"
import {Form, Formik, useFormik} from "formik";
import axios from 'axios';
import {TrashIcon} from '@heroicons/react/solid'
import Button from "../../../../components/Button/Button";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";

const initialValues = {
    item: ''
}

const validationSchema = Yup.object({
    item: Yup.string().required('Required'),
})

const ManageComponent = (props) => {

    const [items, updateItems] = useState([]);
    const [error, updateError] = useState(false);
    const [errorMessage, updateErrorMessage] = useState("")

    const fetchData = async () => {
        //let url = "http://52.142.201.18:24020/usermanagement-service/" + props.type;
        let url = "http://8gd4z.mocklab.io/json/1"
        const response = await axios.get(url)
        if (response.status !== 200) {
            updateError(true)
            return
        }
        updateItems(response.data[props.type])
    }

    useEffect(async () => {
        await fetchData();

    }, []);

    const onDelete = async (index) => {
        updateErrorMessage("");
        const itemsToUpdate = [...items]
        let url = "http://8gd4z.mocklab.io/templated"
        //let url = "http://52.142.201.18:24020/usermanagement-service/" + props.type + "/" + itemsToUpdate[index].id;

        const response = await axios.delete(url);
        if (response.status === 200) {
            itemsToUpdate.splice(index, 1);
            updateItems(itemsToUpdate);
        } else {
            updateErrorMessage("Cannot delete following item: " + itemsToUpdate[index].name);
        }
    }

    const onSubmit = async (values, {setSubmitting, resetForm, setErrors, setStatus}) => {
        console.log(JSON.stringify(values));
        let url = "http://8gd4z.mocklab.io/json"
        //let url = "http://52.142.201.18:24020/usermanagement-service/" + props.type;
        const response = await axios.post(url, JSON.stringify(values));
        //console.log(response.data)
        if (response.status === 200) {
            resetForm();
            fetchData();
        } else {
            updateErrorMessage("Cannot add this item");
        }

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
                {errorMessage.length > 0 ? <p>{errorMessage}</p> : <></>}
                <table className="SubjectsTable">
                    <tbody>
                    {items.map((item, index) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td><TrashIcon onClick={() => onDelete(index)} style={{cursor: 'pointer', color: 'red'}}/>
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
                                            label={"Add "+ props.type}
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
        );
    }
}

export default ManageComponent;