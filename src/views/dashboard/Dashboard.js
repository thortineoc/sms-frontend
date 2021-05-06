import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";
import getKeycloakRoles from "../../utilities/GetRoles";

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

const getWelcomePage = () => {
    return ("Welcome")
}

const Dashboard = (props) => {
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");


    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])
    return (
        (initialized && keycloak.authenticated ? (
            getDashboard(role)
            ) : (
              getWelcomePage()
        )))
}

export default Dashboard;