import React from 'react';
import Grade from "../Grade/Grade";

const TableRow = ({subject, grades}) => {
    return (
        <tr>
            <td>{subject}</td>
            <td>{grades.map(obj =>
                <Grade value={obj.grade} weight={obj.weight} />
            )}
            </td>
        </tr>
    );
};

export default TableRow;
