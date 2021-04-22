import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";

const MultipleSelectField = ({name, options}) => {
    const [values, setValues] = useState([]);

    useEffect(() => {
           console.log(displayValues());
    },[values]);

    const { setFieldValue } = useFormik(name);

    const handleClick = e => {
        const {value} = e.target;
        if(!(values.includes(value))) {
            setValues([...values, value]);
            //setFieldValue(name, values)
        } else {
            const newArr = values.filter(val => val !== value);
            setValues(newArr);
        }
    }

    const displayValues = () => {
        return values.join(', ');
    }

    return (
        <div>
            <select name={name} style={{width:'100%'}}>
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
