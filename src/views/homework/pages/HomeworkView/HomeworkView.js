import {useKeycloak} from "@react-keycloak/web";
import React, {useEffect, useState} from "react";
import getKeycloakRoles from "../../../../utilities/GetRoles";
import HomeworkListStudent from "../HomeworkListStudent/HomeworkListStudent";
import HomeworkListTeacher from "../HomeworkListTeacher/HomeworkListTeacher";

const HomeworkView = (props) => {
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
            <HomeworkListTeacher />
            }
            {(role === 'STUDENT' || role === 'PARENT') &&
            <HomeworkListStudent />
            }
        </div>
    );
}

export default HomeworkView;