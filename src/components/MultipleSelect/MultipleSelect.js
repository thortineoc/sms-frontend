import React, {useEffect, useState} from 'react';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {useFormikContext} from "formik";
import {createMuiTheme} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue
    }
});

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
    noLabel: {
        marginTop: theme.spacing(3),
    },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MultipleSelect = (props) => {
    const classes = useStyles();
    const [picked, setPicked] = useState(props.initialValues !== undefined ? props.initialValues : []);

    const { setFieldValue } = useFormikContext();

    const handleChange = (event) => {
        setPicked(event.target.value);
        setFieldValue(props.name, event.target.value)
    };

    useEffect(() => {
        setFieldValue(props.name, props.initialValues !== undefined ? props.initialValues : [])
    }, []);

    return (
        <ThemeProvider theme={theme}>
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label" color="secondary">{props.label}</InputLabel>
                <Select
                    labelId="demo-mutiple-chip-label"
                    multiple
                    value={picked}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    renderValue={(selected) => (
                        <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                            ))}
                        </div>
                    )}
                    MenuProps={MenuProps}
                >
                    {props.options.map((name) => (
                        <MenuItem key={name} value={name} >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
        </ThemeProvider>
    );
};

export default MultipleSelect;
