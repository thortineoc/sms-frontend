import React, {useEffect} from 'react';

//example row in displayCoulumn: {id: 'lastName', display: true, label: 'Last Name'}
//TODO: change value "display" on submit
//function to update: props.setDisplayColumns()

const ColumnsCheckbox = (props) => {


    return(
        props.displayColumns.map(column=>(
            <div>{column.id} {column.label} {column.display ? "on" : "off"}</div>
    )))
}

export default ColumnsCheckbox;