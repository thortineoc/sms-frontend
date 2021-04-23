import React from 'react';
import { useField } from "formik";
import TextField from '@material-ui/core/TextField';
import './TextFieldWrapper.css'

const TextFieldWrapper = ({name, resetValue = false, setResetValue, ...rest}) => {
    const [field, meta] = useField(name);
    const configField = {
        ...field,
        ...rest,
        autoComplete: "off",
        fullWidth: true
    }

    if (meta && meta.touched && meta.error) {
        configField.error = true;
        configField.helperText = meta.error;
    }

    if (resetValue) {
        configField.value = "";
        setResetValue();
    }

    return (
        <div className="TextFieldWrapper">
            <TextField {...configField} />
        </div>
    );
}

export default TextFieldWrapper;
