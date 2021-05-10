import React from 'react';
import './GradesTable.css';
import GradesTableRow from "../GradesTableRow/GradesTableRow";

const GradesTable = ({data, columns, role, subject, setRefresh}) => {
    const classes = [];
    columns.forEach(element => {
        element = ('GradesTable__' + element.replace(/\s/, ''));
        classes.push(element);
    })

    return (
        <table className="GradesTable">
            <thead>
            <tr>
                {columns.map((item, index) => (
                    <th className={classes[index]}>{item}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {role === 'STUDENT' ? (
                        data && Object.keys(data).map((item) => (
                            <GradesTableRow firstCol={item} grades={data[item]} role={role} subject={subject} setRefresh={setRefresh} />
                        ))
                    ) : (
                         data && data.map(item => (
                            <GradesTableRow firstCol={item['student']} grades={item['grades']} role={role} subject={subject} setRefresh={setRefresh} />
                        ))
                    )
            }

            </tbody>
        </table>
    );
};

export default GradesTable;
