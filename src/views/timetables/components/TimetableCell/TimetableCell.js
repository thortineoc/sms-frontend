import React from 'react';
import './TimetableCell.css';

const TimetableCell = ({id}) => {
    return (
        <td className="TimetableCell">
            {id}
        </td>
    );
};

export default TimetableCell;