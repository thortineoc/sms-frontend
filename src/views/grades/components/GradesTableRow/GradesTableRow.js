import React from 'react';
import Grade from "../Grade/Grade";
import './GradesTableRow.css';

const GradesTableRow = ({subject, grades}) => {
    return (
        <tr className="TableRow">
            <td className="TableRow__subject-cell">{subject}</td>
            <td className="TableRow__grades-cell">
                {grades.map(obj =>
                <Grade value={obj} />
            )}
            </td>
            <td>4.6</td>
            <td>5</td>
        </tr>
    );
};

export default GradesTableRow;
