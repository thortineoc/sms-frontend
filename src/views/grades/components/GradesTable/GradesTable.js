import React from 'react';
import './GradesTable.css';
import GradesTableRow from "../GradesTableRow/GradesTableRow";

const GradesTable = ({data, columns}) => {
    const classes = [];
    columns.forEach(element => {
        element = ('GradesTable__' + element.replace(/\s/, ''));
        console.log(element);
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
            {Object.keys(data).map((item, index) => (
                <GradesTableRow subject={item} grades={data[item]} />
                ))}
            </tbody>
        </table>
    );
};

export default GradesTable;
