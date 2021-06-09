import Timetable from "../../components/Timetable/Timetable";
import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";
import getKeycloakRoles from "../../../../utilities/GetRoles";

const TimetableView = () => {
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState('');
    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])


    return (
        <>
        {role === 'TEACHER' &&
            <Timetable type="TEACHER" />
        }
        {role === 'STUDENT' || role === 'PARENT' &&
            <Timetable type="STUDENT" />
        }
        </>
    )
}

export default TimetableView;