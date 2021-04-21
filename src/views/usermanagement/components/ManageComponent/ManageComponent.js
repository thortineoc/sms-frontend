import React, {useEffect, useState} from 'react';
import "./ManageComponent.css"
import formik, { Formik, Form } from 'formik';
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";


const ManageComponent = (props) => {

    const [subjects, updateSubjects] = useState([]);

    useEffect(async () => {
        const url = "http://8gd4z.mocklab.io/json/1"
        const response = await fetch(url);
        const data = await response.json();
        updateSubjects(data[props.type])
        console.log("updated")

    }, []);

    const onClick = async (e) => {
        let url = "http://8gd4z.mocklab.io/templated"
        console.log(e)
        const d = [...subjects]
        const response = await fetch(url, { method: 'DELETE' });
        if(response.status===200) {
            d.splice(e, 1);
            console.log(d);
            updateSubjects(d);
        }
    }

    const onSubmit = async (values) => {
        console.log(values)
    }

    return (
        <div className="Component">
            <h1>{props.type}</h1>
            <ol>
                {subjects.map((subject, index) => (
                    <li onClick={(x) => onClick(index)}>{subject.name}</li>
                ))}
            </ol>            {/*<Formik onSubmit={onClick} validateOnChange={false}>*/}
            {/*    <div>*/}
            {/*        <TextFieldWrapper*/}
            {/*            label="Add subject"*/}
            {/*            name="addSubject"*/}
            {/*            type="text"*/}
            {/*        />*/}
            {/*        <Button type="submit" label="Add"/>*/}
            {/*    </div>*/}
            {/*</Formik>
*/}
        </div>
    );

}

export default ManageComponent;