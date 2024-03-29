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

export default function TimePickerWrapper({name, label, init}) {

    const { setFieldValue } = useFormikContext();
    const [selectedDate, setSelectedDate] = React.useState(init);
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setFieldValue(name, date)
    };

    useEffect(() => {
        setFieldValue(name, selectedDate);
    }, []);



    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                    margin="normal"
                    id={name}
                    ampm={false}
                    label={label}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                />
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    );
}