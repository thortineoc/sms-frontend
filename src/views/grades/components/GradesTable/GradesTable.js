import React from 'react';
import './GradesTable.css';
import TableRow from "../TableRow/TableRow";


const GradesTable = ({data, columns}) => {
    return (
        <div className="GradesTable">
            <table>
                <thead>
                <tr>
                    {columns.map((item) => (
                        <td>{item}</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {Object.keys(data).map((item, index) => (
                    <TableRow subject={item} grades={data[item]} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GradesTable;
