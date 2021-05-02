import React from 'react';
import Grade from "../Grade/Grade";
import './GradesTableRow.css';
import {AddCircle} from "@material-ui/icons";
import '../../pages/GradesViewCommonStyles/AddCircle.css';
import {PlusCircleIcon} from "@heroicons/react/solid";

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
                        {grades['regular'].map(obj =>
                            <td className="TableRow__inner-cell"><Grade role={role} value={obj} type="regular"/></td>
                        )}
                        {role === 'TEACHER' && (
                            <div className="addCircle"> <PlusCircleIcon /> </div>
                        )}
                    </tr>
                </table>


            </td>
            <td className="TableRow__cell">{((grades['regular'].length !== 0) &&
                countAverage(
                    grades['regular'].map(grade => grade.grade * grade.weight).reduce((a, b) => a + b),
                    grades['regular'].map(grade => grade.weight).reduce((a, b) => a + b)
                )) ?? ''}
            </td>
            <td className="TableRow__cell">
                {Object.keys(grades['final']).length !== 0 ? (
                /*{grades['final'] !== undefined &&
                grades['final'] !== null &&*/
                <Grade role={role} value={grades['final']} type="final"/>
                ) : (
                    role === 'TEACHER' && (
                        <div className="addCircle"> <PlusCircleIcon /> </div>
                    )
                )}
            </td>
        </tr>
    );
};

export default GradesTableRow;
