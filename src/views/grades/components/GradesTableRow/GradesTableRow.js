import React from 'react';
import Grade from "../Grade/Grade";
import './GradesTableRow.css';

const countAverage = (sum, divider) => {
    return (sum / divider).toFixed(2);
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
            <td>{((grades.length !== 0) &&
                countAverage(
                    grades.map(grade => grade.grade * grade.weight).reduce((a, b) => a + b),
                    grades.map(grade => grade.weight).reduce((a, b) => a + b)
                )) ?? ''}
            </td>
            <td></td>
        </tr>
    );
};

export default GradesTableRow;
