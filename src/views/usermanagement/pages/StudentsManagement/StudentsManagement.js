import React, {useCallback, useEffect, useState} from 'react';
import {useKeycloak} from '@react-keycloak/web'
import useAxios from "../../../keycloak/utilities/useAxios";


const StudentManagement = () => {
    const {keycloak, initialized} = useKeycloak();

    let isAdmin = false;
    if(initialized && !keycloak.authenticated)
    {
        keycloak.login();
    }
     const axiosInstance = useAxios('http://52.142.201.18:24020');
     const callApi = useCallback(() => {
         !!axiosInstance.current && axiosInstance.current.post('/usermanagement-service/users/');
     }, [axiosInstance]);

    return (
        <div>
            <div>{`User is ${
                !keycloak.authenticated ? 'NOT ' : ''
            }authenticated`}</div>
            <div>{`Roles: ${isAdmin}`}</div>
            <button type="button" onClick={callApi}>
                Call API
            </button>
        </div>
    );
};

export default StudentManagement;
