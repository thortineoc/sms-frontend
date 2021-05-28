import Typography from "@material-ui/core/Typography";
import {Grid} from "@material-ui/core";
import school from "./resources/school.png"
import book from "./resources/book.png"
import calendar from "./resources/calendar.png"
import grade from "./resources/grade.png"

import "./LandingPage.css"
import ButtonWrapper from "../../components/Button/ButtonWrapper";

const LandingPage = () =>{
    return (
        <div>
        <Grid container direction={"row"} justify="center" alignItems="center" alignContent="flex-end" style={{flexGrow: "1", marginTop: "5%"}} spacing={window.innerWidth <600 ? 5 : 0}>
            <Grid item  lg={6} sm={12} >
                <Grid container direction={"column"}>
                    <Grid item>
                        <Typography variant="h3" style={{width: "80%", marginLeft: "5%", fontFamily: 'Roboto', color: ""}}>
                            School Management System
                        </Typography>
                    </Grid>
                    <Grid item style={{marginTop: "2%"}}>
                        <p style={window.innerWidth <600 ? { marginLeft: "5%", fontFamily: 'Roboto', textAlign: "justify"} : {width: "60%", marginLeft: "5%", fontFamily: 'Roboto', textAlign: "justify"}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </Grid>
                    <Grid container direction={"row"} justify="left" alignItems="center" style={{marginTop: "3%"}}>
                        <Grid item style={{marginLeft: "5%"}}>
                            <ButtonWrapper label={"Contact us"}/>
                        </Grid>
                        <Grid item style={{marginLeft: "5%"}}>
                            <ButtonWrapper label={"MORE INFO"}/>
                        </Grid>
                    <Grid/>
                </Grid>
                </Grid>

            </Grid>
            <Grid item lg={6} sm={12} style={{textAlign: "center"}}>
                <img src={school} style={{width: "80%", height: "auto"}}/>
            </Grid>

        </Grid>

            <Grid container direction={"row"} justify="center" alignItems="center" style={{marginTop: "10%"}}>
                <Grid item lg={4} sm={12}>
                    <img src={grade} style={{width: "30%", height: "auto"}}/>
                </Grid>
                <Grid item lg={4} sm={12}>
                    <img src={calendar} style={{width: "20%", height: "auto"}}/>
                </Grid>
                <Grid item lg={4} sm={12}>
                    <img src={book} style={{width: "20%", height: "auto"}}/>
                </Grid>
            </Grid>

            <a href="https://www.vecteezy.com/free-vector/school">School Vectors by Vecteezy</a>
            <a href="https://www.vecteezy.com/free-vector/calendar">Calendar Vectors by Vecteezy</a>
            <a href="https://www.vecteezy.com/free-vector/grade">Grade Vectors by Vecteezy</a>
            <a href="https://www.vecteezy.com/free-vector/open-book">Open Book Vectors by Vecteezy</a>

        </div>
    )
}

export default LandingPage;