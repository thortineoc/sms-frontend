import React from 'react';
import Grade from "../Grade/Grade";
import './GradesTableRow.css';
import AddCircle from "../AddCircle/AddCircle";
import GradesTable from "../GradesTable/GradesTable";

const countAverage = (sum, divider) => {
    return (sum / divider).toFixed(2);
}

const GradesTableRow = ({role, firstCol, grades, subject, setRefresh}) => {
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
                        {grades && grades['grades'].map(obj =>
                            <td className="TableRow__inner-cell"><Grade role={role} value={obj} setRefresh={setRefresh} type="regular"/></td>
                        )}
                        {role === 'TEACHER' && (
                            <AddCircle studentId={firstCol.id} type="REGULAR"  subject={subject} setRefresh={setRefresh} />
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
                {grades['finalGrade'] != undefined ? (
                <Grade role={role} value={grades['finalGrade']} type="final" setRefresh={setRefresh}/>
                ) : (
                    role === 'TEACHER' && (
                        <AddCircle studentId={firstCol.id} type="FINAL"  subject={subject} setRefresh={setRefresh} />
                    )
                )}
            </td>
        </tr>
    );
};

export default GradesTableRow;
