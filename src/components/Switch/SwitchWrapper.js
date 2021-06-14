import React, {useEffect} from "react";
import {useFormikContext} from "formik";
import {ThemeProvider} from "@material-ui/core/styles";
import {createMuiTheme, Grid, Switch} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue
    }
});

export default function SwitchWrapper({name, label, initial}) {
    const [selectedState, setSelectedState] = React.useState(initial);
    const { setFieldValue } = useFormikContext();

    const handleDateChange = () => {
        setSelectedState(!selectedState);
        setFieldValue(name, !selectedState)
    };

    useEffect(() => {
        setFieldValue(name, true);
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <Grid container direction={"column"} style={{marginTop: "1%"}}>
                <Grid item>
                    {label}
                </Grid>
                <Grid item>
                    <Switch
                        checked={selectedState}
                        onChange={handleDateChange}
                        name={name}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </Grid>
            </Grid>

        </ThemeProvider>
    );
}