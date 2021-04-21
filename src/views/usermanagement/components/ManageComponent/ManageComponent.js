import React, {useEffect, useState} from 'react';
import "./ManageComponent.css"
import {Form, Formik, useFormik} from "formik";
import axios from 'axios';
import {TrashIcon} from '@heroicons/react/solid'
import Button from "../../../../components/Button/Button";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";

const initialValues = {
    item: ''
}

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

    }

    // const formik = useFormik({
    //     initialValues: {
    //         item: ""
    //     },
    //     onSubmit: values => {
    //         console.log(JSON.stringify(values, null, 2))
    //         fetchData()
    //     },
    // });

    if (error) {
        return (
            <div className="Component">
                <h1>Error!</h1>
            </div>
        )
    } else {
        return (

            <div className="Component">
                <h1>{props.type}</h1>
                {errorMessage.length > 0 ? <p>{errorMessage}</p> : <></>}
                <table>
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
                                            name="item"
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


                {/*<form onSubmit={formik.handleSubmit}>*/}

                {/*    <input*/}
                {/*        id="item"*/}
                {/*        name="item"*/}
                {/*        type="item"*/}
                {/*        onChange={formik.handleChange}*/}
                {/*        value={formik.values.email}*/}
                {/*    />*/}

                {/*    <TextFieldWrapper*/}
                {/*        label="First name *"*/}
                {/*        name="firstName"*/}
                {/*        type="text"*/}
                {/*        />*/}

                {/*    <div className="CreateForm__button-wrapper">*/}
                {/*        <Button type="submit" label="Add" />*/}
                {/*    </div>*/}

                {/*</form>*/}
            </div>
        );
    }
}

export default ManageComponent;