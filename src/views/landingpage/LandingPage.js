import Typography from "@material-ui/core/Typography";
import {Grid, Grow, Slide} from "@material-ui/core";
import school from "./resources/school.png"
import book from "./resources/book.png"
import calendar from "./resources/calendar.png"
import grade from "./resources/grade.png"

import "./LandingPage.css"
import ButtonWrapper from "../../components/Button/ButtonWrapper";

const LandingPage = () => {
    return (
        <div>

            <Grid container direction={"row"} justify="center" alignItems="center" alignContent="flex-end"
                  style={{flexGrow: "1", marginTop: "5%"}} spacing={window.innerWidth < 600 ? 5 : 0}>
                <Slide direction="right" in={true}  timeout={2000}>
                <Grid item md={6} sm={12}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <Typography variant="h3"
                                        style={{width: "80%", marginLeft: "5%", fontFamily: 'sans-serif', color: ""}}>
                                School Management System
                            </Typography>
                        </Grid>
                        <Grid item style={{marginTop: "2%"}}>
                            <p style={window.innerWidth < 600 ? {
                                marginLeft: "5%",
                                fontFamily: 'sans-serif',
                                textAlign: "justify"
                            } : {width: "60%", marginLeft: "5%", fontFamily: 'sans-serif', textAlign: "justify"}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                </Slide>
                <Slide direction="left" in={true}  timeout={2000}>
                <Grid item md={6} sm={12} style={{textAlign: "center"}}>
                    <img src={school} style={{width: "80%", height: "auto"}}/>
                </Grid>
                </Slide>

            </Grid>



            <Grid container direction={"row"} justify="center" alignItems="center"
                  style={{marginTop: "10%", textAlign: "center"}} spacing={window.innerWidth < 600 ? 10 : 0}>
                <Grow direction="left" in={true}  timeout={3000}>
                <Grid item md={4} sm={12}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <img src={grade} style={{width: "30%", height: "auto"}}/>
                        </Grid>
                        <Grid item style={{marginTop: "5%"}}>
                            <Typography variant="p" style={{fontFamily: 'sans-serif', fontSize: "1.5em"}}>
                                Grades
                            </Typography>
                        </Grid>
                        <Grid item style={{marginTop: "2%", width: "60%", marginLeft: "20%", textAlign: "justify"}}>
                            <Typography variant="p" style={{fontFamily: 'sans-serif'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </Grow>
                <Grow direction="left" in={true}  timeout={4000}>
                <Grid item md={4} sm={12}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <img src={calendar} style={{width: "30%", height: "auto"}}/>
                        </Grid>
                        <Grid item style={{marginTop: "5%"}}>
                            <Typography variant="p" style={{fontFamily: 'sans-serif', fontSize: "1.5em"}}>
                                Timetable
                            </Typography>
                        </Grid>
                        <Grid item style={{marginTop: "2%", width: "60%", marginLeft: "20%", textAlign: "justify"}}>
                            <Typography variant="p" style={{fontFamily: 'sans-serif'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </Grow>
                <Grow direction="left" in={true}  timeout={5000}>
                <Grid item md={4} sm={12}>
                    <Grid container direction={"column"}>
                        <Grid item>
                            <img src={book} style={{width: "30%", height: "auto"}}/>
                        </Grid>
                        <Grid item style={{marginTop: "5%"}}>
                            <Typography variant="p" style={{fontFamily: 'sans-serif', fontSize: "1.5em"}}>
                                Homeworks
                            </Typography>
                        </Grid>
                        <Grid item style={{marginTop: "2%", width: "60%", marginLeft: "20%", textAlign: "justify"}}>
                            <Typography variant="p" style={{fontFamily: 'sans-serif'}}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                </Grow>
            </Grid>



            <div style={{marginTop: "10%", fontSize: "10px"}}>

                <p style={{textAlign: "center", color: "rgba(0,0,0,0.3)"}}>Projekt zaliczeniowy z przedmiotów: Systemy
                    Informatyczne i Podstawy Programowania Aplikacji Korporacyjncyh</p>
                <p style={{textAlign: "center", color: "rgba(0,0,0,0.3)"}}>Grupa 2D, 2021</p>


                <Grid container direction={"row"} spacing={4} style={{textAlign: "center"}}>
                    <Grid item md={3}>
                        <a style={{color: "rgba(0,0,0,0.3)"}} href="https://www.vecteezy.com/free-vector/school">School
                            Vectors by Vecteezy</a>
                    </Grid>
                    <Grid item md={3}>
                        <a style={{color: "rgba(0,0,0,0.3)"}} href="https://www.vecteezy.com/free-vector/calendar">Calendar
                            Vectors by Vecteezy</a>
                    </Grid>
                    <Grid item md={3}>
                        <a style={{color: "rgba(0,0,0,0.3)"}} href="https://www.vecteezy.com/free-vector/grade">Grade
                            Vectors by Vecteezy</a>
                    </Grid>
                    <Grid item md={3}>
                        <a style={{color: "rgba(0,0,0,0.3)"}} href="https://www.vecteezy.com/free-vector/open-book">Open
                            Book Vectors by Vecteezy</a>
                    </Grid>
                </Grid>


            </div>

        </div>
    )
}

export default LandingPage;