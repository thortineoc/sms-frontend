import React from 'react';
import {ErrorMessage, Field} from "formik";
import TextField from '@material-ui/core/TextField';

const FormControl = ({name, label, type, isRequired}) => {
    isRequired && (label += ' *');
    return (
        <div className="CreateForm__control">
            <Field
                as={TextField}
                label={label}
                type={type}
                id={name}
                name={name}
                autoComplete="off"
                fullWidth
                helperText={
                    <ErrorMessage name={name} >
                        {errorMsg => <div className="error">{errorMsg}</div>}
                    </ErrorMessage>
                }
            />
        </div>
    );
}

export default FormControl;
