import React, {useEffect, useState} from 'react';
import "./ManageComponent.css"


const ManageComponent = (props) => {

    const [subjects, updateSubjects] = useState([]);

    useEffect(async () => {
        const url = props.url;
        const response = await fetch(url);
        const data = await response.json();
        updateSubjects(data[props.type])
    });

    return (
        <div className="Component">
            <h1>{props.type}</h1>
        <ol>
            {subjects.map((subject) => (
                <li>{subject}</li>
            ))}
        </ol>
        </div>
    );

}

export default ManageComponent;