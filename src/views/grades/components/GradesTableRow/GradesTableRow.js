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
                {grades['regular'].map(obj =>
                <Grade value={obj} type="regular"/>
            )}
            </td>
            <td>{((grades['regular'].length !== 0) &&
                countAverage(
                    grades['regular'].map(grade => grade.grade * grade.weight).reduce((a, b) => a + b),
                    grades['regular'].map(grade => grade.weight).reduce((a, b) => a + b)
                )) ?? ''}
            </td>
            <td>
                {Object.keys(grades['final']).length !== 0 &&
                /*{grades['final'] !== undefined &&
                grades['final'] !== null &&*/
                <Grade value={grades['final']} type="final"/>}
            </td>
        </tr>
    );
};

export default GradesTableRow;
