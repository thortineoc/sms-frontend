import React from 'react';
import './GradesTable.css';
import GradesTableRow from "../GradesTableRow/GradesTableRow";

const GradesTable = ({data, columns, role}) => {
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
                        Object.keys(data).map((item, index) => (
                            <GradesTableRow subject={item} grades={data[item]} role={role} />
                        ))
                    ) : (
                        data.map(item => (
                            <GradesTableRow subject={item['student']} grades={item['grades']} role={role} />
                        ))
                    )
            }

            </tbody>
        </table>
    );
};

export default GradesTable;
