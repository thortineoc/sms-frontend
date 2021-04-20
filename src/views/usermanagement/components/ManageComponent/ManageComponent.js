import React, {useEffect, useState} from 'react';

const ManageComponent = (props) => {

    const [subjects, updateSubjects] = useState([]);

    useEffect(async () => {
        const url = props.url;
        const response = await fetch(url);
        const data = await response.json();
        updateLoading(false)
        updateSubjects(data.subjects)
    });

    return (
        <ol>
            {subjects.map((subject) => (
                <li>{subject}</li>
            ))}
        </ol>
    );

}

export default ManageComponent;