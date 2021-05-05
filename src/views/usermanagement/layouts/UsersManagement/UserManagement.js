import React from 'react';
import {useKeycloak} from "@react-keycloak/web";
import UserDisplayTable from "../../components/UserDisplayTable/UserDisplayTable";

const UserManagement = ({role}) => {

    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>
    }
    if (!!initialized && !keycloak.authenticated) {
        keycloak.login();
    }

    return (
            <UserDisplayTable role={role}/>
    );
}

export default UserManagement;
