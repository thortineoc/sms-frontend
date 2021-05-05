import React from 'react';
import Grade from "../Grade/Grade";
import './GradesTableRow.css';
import AddCircle from "../AddCircle/AddCircle";

const countAverage = (sum, divider) => {
    return (sum / divider).toFixed(2);
}

const GradesTableRow = ({role, firstCol, grades}) => {
    return (
        <tr className="TableRow">
            <td className="TableRow__cell">
            {role === 'STUDENT' ? (
                firstCol
            ) : (
                `${firstCol.firstName} ${firstCol.lastName}`
            )}
            </td>
            <td className="TableRow__cell">

                <table className="TableRow__inner-table">
                    <tr className="TableRow__inner-row">
                        {grades['grades'].map(obj =>
                            <td className="TableRow__inner-cell"><Grade role={role} value={obj} type="regular"/></td>
                        )}
                        {role === 'TEACHER' && (
                            <AddCircle studentId={firstCol} type="REGULAR" />
                        )}
                    </tr>
                </table>


            </td>
            <td className="TableRow__cell">{((grades['grades'].length !== 0) &&
                countAverage(
                    grades['grades'].map(grade => grade.grade * grade.weight).reduce((a, b) => a + b),
                    grades['grades'].map(grade => grade.weight).reduce((a, b) => a + b)
                )) ?? ''}
            </td>
            <td className="TableRow__cell">
                {/*Object.keys(grades['isFinal']).length !== 0 */}
                {grades['isFinal'] != undefined ? (
                <Grade role={role} value={grades['isFinal']} type="final"/>
                ) : (
                    role === 'TEACHER' && (
                        <AddCircle studentId={firstCol} type="FINAL" />
                    )
                )}
            </td>
        </tr>
    );
};

export default GradesTableRow;
