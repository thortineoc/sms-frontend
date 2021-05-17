import React from 'react';
import './SelectFieldWrapper.css';
import {TextField, MenuItem, createMuiTheme} from "@material-ui/core";
import { useField, useFormikContext } from "formik";
import {blue} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue
    }
});

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
        <ThemeProvider theme={theme}>
        <div className="SelectFieldWrapper">
            <TextField {...configSelect} color="primary" style={(rest.style===undefined ? ({marginBottom: "5%"}) : ({...rest.style}))}>
                {options && options.map((item, index) => {
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
        </ThemeProvider>
    );
}

export default SelectFieldWrapper;
