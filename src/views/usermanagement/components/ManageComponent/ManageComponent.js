import React, {useEffect, useState} from 'react';
import "./ManageComponent.css"
import {useFormik} from "formik";

const ManageComponent = (props) => {

    const [items, updateItems] = useState([]);
    const [error, updateError] = useState(false);
    const [errorMessage, updateErrorMessage] = useState("")

    useEffect(async () => {
        let url = "";
        if (props.type === "subjects") {
            //change to url for fetching subjects
            url = "http://8gd4z.mocklab.io/json/1"
        } else if (props.type === "groups") {
            //change to url for fetching groups
            url = "http://8gd4z.mocklab.io/json/1"
        } else {
            updateError(true)
            return
        }
        const response = await fetch(url);
        if (response.status !== 200) {
            updateError(true)
            return
        }
        const data = await response.json();
        updateItems(data[props.type])

    }, []);

    const onDelete = async (index) => {
        updateErrorMessage("");
        let url = "http://8gd4z.mocklab.io/templated"
        const itemsToUpdate = [...items]
        //change to url for deleting items
        //let url = "http://8gd4z.mocklab.io/templated/" + itemsToUpdate[index].id;
        console.log(url)
        const response = await fetch(url, {method: 'DELETE'});
        if (response.status === 200) {
            itemsToUpdate.splice(index, 1);
            updateItems(itemsToUpdate);
        } else{
            updateErrorMessage("Cannot delete following item: " + itemsToUpdate[index].name);
        }
    }

    const formik = useFormik({
        initialValues: {
            item: ""
        },
        onSubmit: values => {
            console.log(JSON.stringify(values, null, 2))
        },
    });

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
                {errorMessage.length>0 ? <p>{errorMessage}</p> : <></>}
                <ol>
                    {items.map((item, index) => (
                        <li onClick={() => onDelete(index)} key={item.id}>{item.name}</li>
                    ))}
                </ol>
                <form onSubmit={formik.handleSubmit}>

                    <input
                        id="item"
                        name="item"
                        type="item"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />

                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}

export default ManageComponent;