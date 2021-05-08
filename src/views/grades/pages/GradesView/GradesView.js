import React, {useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import getKeycloakRoles from "../../../../utilities/GetRoles";
import GradesViewTeachers from "../GradesViewTeachers/GradesViewTeachers";
import GradesViewStudents from "../GradesViewStudents/GradesViewStudents";

const GradesView = () => {
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState('');
    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])

    return (
        <div>
            {role === 'TEACHER' &&
            <GradesViewTeachers />
            }
            {(role === 'STUDENT' || role === 'PARENT') &&
            <GradesViewStudents />
            }
        </div>
    );
};

export default GradesView;