import React from 'react';
import Grade from "../Grade/Grade";
import './GradesTableRow.css';
import AddCircle from "../AddCircle/AddCircle";

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

                <div className="TableRow__grades-container">
                        {grades && grades['grades'].map(obj =>
                          <Grade role={role} value={obj} setRefresh={setRefresh} type="regular"/>
                        )}
                        {role === 'TEACHER' && (
                            <AddCircle studentId={firstCol.id} type="REGULAR"  subject={subject} setRefresh={setRefresh} />
                        )}
                </div>


            </td>
            <td className="TableRow__cell">{((grades['grades'].length !== 0) &&
                countAverage(
                    grades['grades'].map(grade => grade.grade * grade.weight).reduce((a, b) => a + b),
                    grades['grades'].map(grade => grade.weight).reduce((a, b) => a + b)
                )) ?? ''}
            </td>
            <td className="TableRow__cell">

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
