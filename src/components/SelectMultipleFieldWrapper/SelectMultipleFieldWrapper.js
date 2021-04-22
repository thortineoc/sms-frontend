import React, {useState} from 'react';
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const SelectMultipleFieldWrapper = ({name, options, ...rest}) => {
    const [subjects, setSubjects] = useState([]);

    const {setFieldValue} = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = e => {
        let {value} = e.target;
        console.log("WALJU : ", value, typeof value);
        setSubjects([...subjects, value]);
        console.log(subjects)
        setFieldValue(name, subjects);
    }

    const configSelect = {
        ...field,
        ...rest,
        select: true,
        fullWidth: true,
        onChange: handleChange,
    }

    return (
        <div className="SelectFieldWrapper">
            <TextField {...configSelect} >
                {options.map((item, index) => {
                    return (
                        <MenuItem key={index} value={item}>
                            {item}
                        </MenuItem>
                    )
                })}
            </TextField>
        </div>
    );
}

export default SelectMultipleFieldWrapper;
