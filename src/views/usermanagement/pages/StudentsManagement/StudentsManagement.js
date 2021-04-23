import React, {useCallback, useState} from 'react';
import {useKeycloak} from '@react-keycloak/web'
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../common/CallBackandGet";
import callBackendPost from "../../../common/CallBackendPost";


const StudentManagement = () => {
    const {keycloak, initialized} = useKeycloak();
    const [resData, setResData] = useState();


    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const runBackendGet = useCallback((axiosInstance, url, data) => {
        if (!!initialized) {
            callBackendGet(axiosInstance, url, setResData, data);
        }
    }, [initialized]);
    const runBackendPost = useCallback((axiosInstance, url, data) => {
        if (!!initialized) {
            callBackendPost(axiosInstance, url, setResData, data);
        }
    }, [initialized]);

    return (
        <div>
            <div>{`User is ${
                !keycloak.authenticated ? 'NOT ' : ''
            }authenticated`}</div>
            <button type="button"
                    onClick={() => runBackendPost(axiosInstance,
                        '/usermanagement-service/users/', {"Hello": ["WORLD"]})}>
                Call callManagementApi
            </button>
            <br/>
            <button type="button"
                    onClick={() => runBackendGet(axiosInstance,
                        '/presence-service/test/service-client-receive', null)}>
                Call callPresenceApi
            </button>
            <div>{`Response: ${JSON.stringify(resData)}`}</div>
        </div>
    );
};

export default StudentManagement;
