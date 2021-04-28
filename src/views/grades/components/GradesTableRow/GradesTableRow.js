import React from 'react';
import Grade from "../Grade/Grade";
import './GradesTableRow.css';

const countAverage = (values) => {
    const sum = values.reduce((a, b) => a + b);
    const average = sum / values.length;
    return average.toFixed(2);
}

const GradesTableRow = ({subject, grades}) => {
    return (
        <tr className="TableRow">
            <td className="TableRow__subject-cell">{subject}</td>
            <td className="TableRow__grades-cell">
                {grades.map(obj =>
                <Grade value={obj} />
            )}
            </td>
            <td>{((grades.length !== 0) && countAverage(grades.map(grade => grade.grade))) ?? ''}</td>
            <td>5</td>
        </tr>
    );
};

export default GradesTableRow;
