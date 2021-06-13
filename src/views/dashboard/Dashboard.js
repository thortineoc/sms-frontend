import {useKeycloak} from "@react-keycloak/web";
import React, {useEffect, useState} from "react";
import getKeycloakRoles from "../../utilities/GetRoles";
import LandingPage from "../landingpage/LandingPage";
import UserProfile from "../profile/profile";
import StudentManagement from "../usermanagement/pages/StudentsManagement/StudentsManagement";
import TimetableView from "../timetables/pages/TimetableView/TimetableView";
import {Route} from "react-router-dom";

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

    const getView = (role) =>{
        if(role==="ADMIN"){
            return (<StudentManagement />)
        } else {
            return ( <TimetableView />)
        }
    }




    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)}
    }, [keycloak, initialized])
    return (
        (initialized && keycloak.authenticated ? (
            getView(role)
            ) : (
              <LandingPage/>
        )))
}

export default Dashboard;