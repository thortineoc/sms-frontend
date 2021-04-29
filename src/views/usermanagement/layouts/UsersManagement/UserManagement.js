import React, {useCallback, useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import UserDisplayTable from "../../components/UserDisplayTable/UserDisplayTable";

const UserManagement = (props) => {

    const {keycloak, initialized} = useKeycloak();

    if (!initialized) {
        return <div>Loading...</div>
    }
    if (!!initialized && !keycloak.authenticated) {
        keycloak.login();
    }

    return (
            <UserDisplayTable type={props.type}/>
    );
};

export default UserManagement;
