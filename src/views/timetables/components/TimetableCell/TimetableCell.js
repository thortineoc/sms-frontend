import React from 'react';
import './TimetableCell.css';

const getRowNumber = (id) => {
    let pos = id.indexOf('L');
    return Number.parseInt(id.slice(0, pos));
}

const getColNumber = (id) => {
    let start = id.indexOf('L') + 1;
    let end = id.indexOf('R');
    return Number.parseInt(id.slice(start, end));
}

const TimetableCell = ({id}) => {
    console.log(getColNumber(id))

    return (
        <td className="TimetableCell">
            { getColNumber(id) === 0 ? (
                8.00
            ) : (
              "lsls"
            )}
        </td>
    );
};

export default TimetableCell;