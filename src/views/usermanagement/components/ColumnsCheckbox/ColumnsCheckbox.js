import React, {useEffect} from 'react';

//function to update: props.setDisplayColumns()

const ColumnsCheckbox = (props) => {


    return(
        props.displayColumns.map(column=>(
            <div>{column.id} {column.label} {column.display ? "on" : "off"}</div>
    )))
}

export default ColumnsCheckbox;