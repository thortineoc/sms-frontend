import React, {useCallback} from 'react';
import Button from "../../../../components/Button/Button";
import './DialogBox.css';
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendDelete from "../../../../utilities/CallBackendDelete";

const DialogBox = ({user, setDisplayDialog, setDeleteUser, setDetailsModalShown}) => {
    const {keycloak, initialized} = useKeycloak();
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const runBackend = useCallback((axiosInstance, url, data) => {
        if (!!initialized) {
            callBackendDelete(axiosInstance, url, data)
                .then(response => console.log(response))
                .catch(error => console.log(error));
        }
    }, [initialized]);

    const handleAccept = () => {
        runBackend(axiosInstance, "/usermanagement-service/users/" + user.id, null);
        setDetailsModalShown(false);
    }

    const handleCancel = () => {
        setDisplayDialog(false);
    }

    return (
        <div className="DialogBox">
            <strong>Are you sure that you want to delete this account?</strong>
            <div className="DialogBox__options">
                <Button label='yes' onClick={handleAccept}/>
                <Button label='no' onClick={handleCancel}/>
            </div>
        </div>
    );
};

export default DialogBox;
