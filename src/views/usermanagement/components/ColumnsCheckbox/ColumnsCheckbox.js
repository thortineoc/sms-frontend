import React, {useEffect, useState} from 'react';
import Button from "../../../../components/Button/Button";
import './ColumnsCheckbox.css'
import {Checkbox} from "@material-ui/core";

//example row in displayCoulumn: {id: 'lastName', display: true, label: 'Last Name'}
//TODO: change value "display" on submit
//function to update: props.setDisplayColumns()

const ColumnsCheckbox = ({displayColumns, setDisplayColumns, setIsActive, fetchData}) => {
    const [values, setValues] = useState(displayColumns);

    const handleSubmit = () => {
        setDisplayColumns(values);
        setIsActive(false);
        fetchData();
    }

    useEffect(() => {
        console.log("columns: ", values)
    }, [values]);

    return (
        <div className="ColumnsCheckbox">
            <h3>Columns</h3>
            <div className="ColumnsCheckbox__grid">
                {values.map((column, index) => (
                    <div className="ColumnsCheckbox__row">
                        <Checkbox
                            style ={{
                                color: "#020024FF",
                            }}
                            color="primary"
                            name={index}
                            defaultChecked={column.display}
                            onChange={(e) => {
                                console.log(e.target.checked)
                                if (e.target.checked) {
                                    let result = values;
                                    result[e.target.name] = {...(values[e.target.name]), display: true}
                                    setValues(result)

                                } else {
                                    let result = values;
                                    result[e.target.name] = {...(values[e.target.name]), display: false}
                                    setValues(result);


                                }
                            }}
                        />
                        {column.label}
                    </div>

                ))}
            </div>
            <div className="ColumnsCheckbox__button">
                <Button label='Apply' onClick={handleSubmit}/>
            </div>

        </div>
    )
}

export default ColumnsCheckbox;