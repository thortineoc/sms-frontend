import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";
import getKeycloakRoles from "../../utilities/GetRoles";
import LandingPage from "../landingpage/LandingPage";
import UserProfile from "../profile/profile";

const getDashboard = (role) =>{
    switch (role){
        case "ADMIN":
            return("DASHBOARD FOR ADMIN")
        case "STUDENT":
            return("DASHBOARD FOR STUDENT")
        case "TEACHER":
            return("DASHBOARD FOR TEACHER")
        case "PARENT":
            return("DASHBOARD FOR PARENT")
        default:
            return("DASHBOARD")
    }
}



const Dashboard = (props) => {
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");



    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)}
    }, [keycloak, initialized])
    return (
        (initialized && keycloak.authenticated ? (
            <UserProfile/>
            ) : (
              <LandingPage/>
        )))
}

export default Dashboard;