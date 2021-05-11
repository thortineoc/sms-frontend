import React from 'react';
import { useField } from "formik";
import TextField from '@material-ui/core/TextField';
import './TextFieldWrapper.css'
import {createMuiTheme} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue
    }
});

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
        <ThemeProvider theme={theme}>
        <div >
            <TextField {...configField} color="primary" style={(rest.style===undefined ? ({marginBottom: "5%"}) : ({...rest.style}))}/>
        </div>
        </ThemeProvider>
    );
}

export default TextFieldWrapper;
