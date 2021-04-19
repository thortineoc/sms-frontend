import React from 'react';
import { useField } from "formik";
import TextField from '@material-ui/core/TextField';
import './TextFieldWrapper.css'

const TextFieldWrapper = ({ name, ...rest }) => {
    const [field, meta] = useField(name);
    const configField = {
        ...field,
        ...rest,
        autoComplete: "off",
        fullWidth: true
    }

    if(meta && meta.touched && meta.error) {
        configField.error = true;
        configField.helperText = meta.error;
    }

    return (
        <div className="TextFieldWrapper">
            <TextField {...configField} />
        </div>
    );
}

export default TextFieldWrapper;
