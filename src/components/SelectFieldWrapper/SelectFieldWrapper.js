import React from 'react';
import './SelectFieldWrapper.css';
import { TextField, MenuItem } from "@material-ui/core";
import { useField, useFormikContext } from "formik";

const SelectFieldWrapper = ({name, options, ...rest}) => {

    const { setFieldValue } = useFormikContext();
    const [field, meta] = useField(name);

    const handleChange = e => {
        const { value } = e.target;
        setFieldValue(name, value);
    }

    const configSelect = {
        ...field,
        ...rest,
        select: true,
        fullWidth: true,
        onChange: handleChange
    }

    if(meta && meta.touched && meta.error) {
        configSelect.error = true;
        configSelect.helperText = meta.error;
    }

    return (
        <div className="SelectFieldWrapper">
            <TextField {...configSelect} >
                {options.map((item, index) => {
                    if(item === '') {
                        return (
                            <MenuItem key={index} value={item}>
                                <em>None</em>
                            </MenuItem>
                        )
                    }
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

export default SelectFieldWrapper;
