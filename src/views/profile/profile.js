import React, {useEffect, useState} from "react";
import {useKeycloak} from "@react-keycloak/web";
import {Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import "./profile.css"


const UserProfile = () => {
    const {keycloak, initialized} = useKeycloak();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if (!!initialized) {
            keycloak.loadUserProfile()
                .then((profile) => {
                    setProfile(profile)
                    console.log(profile)
                })
                .catch((error) => console.log(error));
        }
    }, [keycloak, initialized])

    return (
        <div>
            <Paper style={(window.innerWidth > 1000) ? {width: "40%", marginLeft: "30%", padding: "20px"} : {
                width: "100%",
                padding: "10px"
            }}>
                <Grid container direction={"column"} alignItems={"left"}>
                    <Grid item style={{alignSelf: "center", marginBottom: "4%"}}>
                        <Paper style={{
                            width: 150,
                            height: 150,
                            borderRadius: 150 / 2,
                            backgroundColor: "rgba(32,150,243,0.49)"
                        }}>
                            <Typography variant="h3" style={{
                                textAlign: "center",
                                paddingTop: "45px",
                                color: "white",
                                fontFamily: "Roboto"
                            }}>
                                {profile && profile.firstName && profile.firstName.length > 0 ? (profile.firstName.charAt(0).toUpperCase()) : ("")}{profile && profile.lastName && profile.lastName.length > 0 ? (profile.lastName.charAt(0).toUpperCase()) : ("")}
                            </Typography>
                        </Paper>
                    </Grid>
                    {profile && profile.firstName &&
                    <Grid item>
                        <div className="Profile__label">First Name</div>
                        <div className="Profile__data">
                            {profile.firstName}
                        </div>
                    </Grid>}
                    {profile && profile.attributes.middleName &&
                    <Grid item>
                        <div className="Profile__label">Middle Name</div>
                        <div className="Profile__data">
                            {profile.attributes.middleName}
                        </div>
                    </Grid>}
                    {profile && profile.lastName &&
                    <Grid item>
                        <div className="Profile__label">Last Name</div>
                        <div className="Profile__data">
                            {profile.lastName}
                        </div>
                    </Grid>}
                    {profile && profile.username &&
                    <Grid item>
                        <div className="Profile__label">Username</div>
                        <div className="Profile__data">
                            {profile.username}
                        </div>
                    </Grid>}
                    {profile && profile.attributes.pesel &&
                    <Grid item>
                        <div className="Profile__label">PESEL</div>
                        <div className="Profile__data">
                            {profile.attributes.pesel}
                        </div>
                    </Grid>}
                    {profile && profile.email &&
                    <Grid item>
                        <div className="Profile__label">E-mail</div>
                        <div className="Profile__data">
                            {profile.email}
                        </div>
                    </Grid>}
                    {profile && profile.attributes.phoneNumber &&
                    <Grid item>
                        <div className="Profile__label">Phone</div>
                        <div className="Profile__data">
                            {profile.attributes.phoneNumber}
                        </div>
                    </Grid>}
                    {profile && profile.attributes.group &&
                    <Grid item>
                        <div className="Profile__label">Group</div>
                        <div className="Profile__data">
                            {profile.attributes.group}
                        </div>
                    </Grid>}
                    {profile && profile.attributes.subjects &&
                    <Grid item>
                        <div className="Profile__label">Subjects</div>
                        <div className="Profile__data">
                            {profile.attributes.subjects.toString().split(',').join(", ")}
                        </div>
                    </Grid>}
                    <Grid item>
                        <p style={{textAlign: "center", color: "rgba(0,0,0,0.45)"}}>To update your details, contact
                            system administrator.</p>
                    </Grid>
                </Grid>
            </Paper>
        </div>

    )
}

export default UserProfile;