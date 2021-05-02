import React from 'react';
import './Button.css';
import Button from '@material-ui/core/Button'
import {createMuiTheme} from "@material-ui/core";
import { ThemeProvider } from '@material-ui/styles';
import {blue} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: blue
    }
});

const ButtonWrapper = ({label, ...rest}) => {
    return (
        <ThemeProvider theme={theme}>
        <Button className="Button" {...rest} color="primary" variant="contained">
            {label}
        </Button>
        </ThemeProvider>
    );
};

export default ButtonWrapper;
