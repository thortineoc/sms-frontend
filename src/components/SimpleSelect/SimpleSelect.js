import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SimpleSelect = ({label, options, value, setValue}) => {
    const classes = useStyles();
    const [selected, setSelected] = useState('');

    const handleChange = e => {
        //setSelected();
        setValue(e.target.value);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={value}
                    onChange={handleChange}
                >
                    {options.map((item) => (
                        <MenuItem value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default SimpleSelect;
