import React, {useCallback, useEffect, useState} from 'react';
import './Details.css';
import {TrashIcon} from "@heroicons/react/outline";
import {Dialog} from "@material-ui/core";
import Modal from "../Modal/Modal";
import DialogBox from "../DialogBox/DialogBox";
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import callBackendDelete from "../../../../utilities/CallBackendDelete";
import callBackendGet from "../../../../utilities/CallBackendGet";
import axios from "axios";

const Details = ({user, setShowEdit, setDetailsModalShown, role, fetchData, refresh}) => {

    const [displayDialog, setDisplayDialog] = useState(false);
    const [deleteUser, setDeleteUser] = useState('');
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [parent, setParent] = useState({});

    const handleClick = () => {
        if (!displayDialog) {
            setShowEdit(true);
        }
    }

    useEffect(() => {
        let unmounted = false;
        let source = axios.CancelToken.source();
        if (role === "STUDENT") {
            callBackendGet(axiosInstance, "usermanagement-service/users/" + user.relatedUser, null)
                .then(response => {
                    if (!unmounted) {
                        setParent(response.data);
                    }
                })
                .catch(error => {
                    if (!unmounted) {
                        console.log(error);
                    }
                });
        }
        return function () {
            unmounted = true;
            source.cancel("Cancelling in cleanup");
        };
    }, [])

    if (Object.keys(parent).length === 0 && role==="STUDENT") {
        return ("Please wait. We're doing our best :)");
    }

    return (
        <div className="Details">

            <h3>Personal information</h3>
            <div className="Details__student-grid">
                <div className="Details__field">
                    <div className="Details__label">First name</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.firstName}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Middle name</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.middleName}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Last name</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.lastName}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">PESEL</div>
                    <div className="Details__data-not-modifiable">
                        {user.pesel}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">E-mail address</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.email}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Phone number</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.phoneNumber}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">User ID</div>
                    <div className="Details__data-not-modifiable">
                        {user.id}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Username</div>
                    <div className="Details__data-not-modifiable">
                        {user.userName}
                    </div>
                </div>
                {role === 'STUDENT' &&
                <div className="Details__field">
                    <div className="Details__label">Group</div>
                    <div className="Details__data"
                         onClick={handleClick}
                    >
                        {user.group}

                    </div>
                </div>}
            </div>

            {role === 'STUDENT' ? (
                <>
                    <h3>Parent contact information</h3>
                    <div className="Details__parent-grid">
                        <div className="Details__field">
                            <div className="Details__label">Address e-mail</div>
                            <div className="Details__data"
                                 onClick={handleClick}>
                                {parent.email}
                            </div>
                        </div>
                        <div className="Details__field">
                            <div className="Details__label">Phone number</div>
                            <div className="Details__data"
                                 onClick={handleClick}>
                                {parent.customAttributes.phoneNumber}
                            </div>
                        </div>
                        <div className="Details__field">
                            <div className="Details__label">User ID</div>
                            <div className="Details__data-not-modifiable">
                                {parent.id}
                            </div>
                        </div>
                        <div className="Details__field">
                            <div className="Details__label">Username</div>
                            <div className="Details__data-not-modifiable">
                                {parent.userName}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="Details__teacher-field">
                    <div className="Details__label">Subjects</div>
                    <div className="Details__data-subjects"
                         onClick={handleClick}>
                        {(user.subjects &&
                            user.subjects.map(subject => <span>{subject + ' '}</span>))}
                    </div>
                </div>
            )}

            <div className="Details__delete-wrapper">
                <TrashIcon id="delete" className="Details__delete" onClick={() => {
                    setDisplayDialog(true);
                }}/>
            </div>

            {displayDialog && <DialogBox
                user={user}
                setDisplayDialog={setDisplayDialog}
                setDeleteUser={setDeleteUser}
                setDetailsModalShown={setDetailsModalShown}
                fetchData={fetchData}
                refresh={refresh}
            />}

        </div>
    );
};

export default Details;
