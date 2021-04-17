import React from 'react';
import TextField from "@material-ui/core/TextField";
import {ErrorMessage, Field} from "formik";

const DateFormControl = ({name, label, type, isRequired}) => {
    isRequired && (label += ' *');
    return (
        <div className="DateFormControl">
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
                InputLabelProps={{
                    shrink: true
                }}
            />
        </div>
    );
};

export default DateFormControl;
