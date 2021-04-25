import React, {useEffect, useState} from 'react';
import {useFormikContext} from "formik";
import './MultipleSelectField.css';

const MultipleSelectField = ({name, options, label, initialValues = []}) => {
    const [values, setValues] = useState(initialValues);
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        setFieldValue(name, values);
    },[values]);

    const handleClick = e => {
        const {value} = e.target;
        if(!(values.includes(value))) {
            setValues([...values, value]);
        } else {
            setValues(values.filter(val => val !== value));
        }
    }

    const displayValues = () => {
        return values.join(', ');
    }

    return (
        <div className="MultipleSelectField">
            <label className="MultipleSelectField__label">
                {label}
            </label>
            <select className="MultipleSelectField__input">
                {options.map((item, index) => {
                    return (
                        <option key={index} value={item} onClick={handleClick}>
                            {item}
                        </option>
                    )
                })}
            </select>
            <p>{displayValues()}</p>
        </div>
    );
}

export default MultipleSelectField;
