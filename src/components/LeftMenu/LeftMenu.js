import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import './LeftMenu.css'
import Logout from "../../views/keycloak/pages/Logout/Logout";
import {useKeycloak} from "@react-keycloak/web";
import getKeycloakRoles from "../../utilities/GetRoles";

const LeftMenu = () => {
    /*
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");

    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])
*/
    let role = 'STUDENT';
    return (
        <div className="LeftMenu">
            {role === 'ADMIN' ? (
                <nav>
                    <Link to="/api/usermanagement-service/students" role={role}>Students management</Link>
                    <Link to="/api/usermanagement-service/teachers">Teachers management</Link>
                    <Link to="/api/usermanagement-service/timetables">Timetables management</Link>
                    <Link to="/api/usermanagement-service/temp">Create</Link>
                    <Logout/>
                </nav>
            ) : (
                <nav>
                    <Link to="/api/timetable-service">Timetables</Link>
                    <Link to="/api/homework-service">Homework</Link>
                    <Link to="/api/grades-service">Grades</Link>
                    <Link to="/api/presence-service">Presences</Link>
                    <Logout/>
                </nav>
            )}
        </div>
    );
}

export default LeftMenu;