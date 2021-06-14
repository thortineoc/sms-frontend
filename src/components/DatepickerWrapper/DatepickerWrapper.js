import 'date-fns';
import React, {useEffect} from 'react';
import DateFnsUtils from '@date-io/date-fns'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {useFormikContext} from "formik";
import {createMuiTheme} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import {ThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue
    }
});

export default function DatepickerWrapper({name, label, initial}) {
    const [selectedDate, setSelectedDate] = React.useState(initial);
    const { setFieldValue } = useFormikContext();

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFieldValue(name, date)
    };

    useEffect(() => {
        setFieldValue(name, initial);
    }, []);


    return (
        <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="date-picker-inline"
                    label={label}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
        </MuiPickersUtilsProvider>
            </ThemeProvider>
    );
}