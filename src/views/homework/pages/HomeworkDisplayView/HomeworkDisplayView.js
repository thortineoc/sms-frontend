import React, {useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import getKeycloakRoles from "../../../../utilities/GetRoles";
import HomeworkDetailsAndResponses from "../../components/HomeworkDetailsAndResponses/HomeworkDetailsAndResponses";

const HomeworkDisplayView = ({id}) => {
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");

    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])

    return (
        <div>
            {role === 'TEACHER' &&
            <HomeworkDetailsAndResponses id={id} role={role} />
            }
            {(role === 'STUDENT' || role === 'PARENT') &&
            <HomeworkDetailsAndResponses id={id} role={role} />
            }
        </div>
    );
};

export default HomeworkDisplayView;