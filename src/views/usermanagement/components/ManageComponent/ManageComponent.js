import React, {useEffect, useState} from 'react';
import "./ManageComponent.css"
import {useFormik} from "formik";
import axios from 'axios';

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
            fetchData()
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