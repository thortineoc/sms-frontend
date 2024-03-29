import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {createMuiTheme} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue
    }
});

const SimpleSelect = ({label, options, value, setValue, defaultValue}) => {
    const classes = useStyles();

    useEffect(() => {
        setValue(defaultValue);
    }, [])

    const handleChange = e => {
        setValue(e.target.value);
    }

    return (
        <ThemeProvider theme={theme}>
            <FormControl id={'formSelect'+label} className={classes.formControl}>
                <InputLabel>{label}</InputLabel>
                <Select id={'select'+label}
                    value={value}
                    onChange={handleChange}
                >
                    {options && options.map((item, index) => {
                        if (item === '') {
                            return (
                                <MenuItem key={index} value={item}>
                                    <em>None</em>
                                </MenuItem>
                            )
                        }
                        return (
                            <MenuItem id={'v'+item} key={index} value={item}>
                                {item}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </ThemeProvider>
    );
};

export default SimpleSelect;
