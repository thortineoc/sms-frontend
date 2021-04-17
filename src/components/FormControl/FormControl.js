import React from 'react';
import { useField } from "formik";
import TextField from '@material-ui/core/TextField';
import './FormControl.css'

const FormControl = ({ name, ...rest }) => {
    const [field, meta] = useField(name);
    const configField = {
        ...field,
        ...rest,
        fullWidth: true
    }

    if (meta && meta.touched && meta.error) {
        configField.error = true;
        configField.helperText = meta.error;
    }
    configField.required && (configField.label += ' *');
    configField.required = false;

    return (
        <div className="FormControl">
            <TextField {...configField} />
        </div>
    );
}

export default FormControl;
