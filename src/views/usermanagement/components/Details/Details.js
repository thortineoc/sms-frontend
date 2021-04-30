import React, {useCallback, useState} from 'react';
import './Details.css';
import { TrashIcon } from "@heroicons/react/outline";
import {Dialog} from "@material-ui/core";
import Modal from "../Modal/Modal";
import DialogBox from "../DialogBox/DialogBox";
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import callBackendDelete from "../../../../utilities/CallBackendDelete";

const Details = ({user, setShowEdit, setDetailsModalShown, role}) => {

    const [displayDialog, setDisplayDialog] = useState(false);
    const [deleteUser, setDeleteUser] = useState('');

    const handleClick = () => {
        if(!displayDialog) {
            setShowEdit(true);
        }
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
                <div className="Details__field">
                    <div className="Details__label">Group</div>
                    <div className="Details__data"
                         onClick={handleClick}
                    >
                        {user.group}

                    </div>
                </div>
            </div>


            {role === 'STUDENT' ? (
                <>
                    <h3>Parent contact information</h3>
                    <div className="Details__parent-grid">
                        <div className="Details__field">
                            <div className="Details__label">Address e-mail</div>
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
                    </div>
                </>
            ) : (
                <div className="Details__teacher-field" >
                    <div className="Details__label">Subjects</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {(  user.subjects &&
                            user.subjects.map(subject => <div className="Details__subject">{subject}</div>)) ?? '-'}
                    </div>
                </div>
            )}

            <div className="Details__delete-wrapper">
                 <TrashIcon className="Details__delete" onClick={() => {
                     setDisplayDialog(true);

                 }} />
            </div>

            { displayDialog && <DialogBox
                user={user}
                setDisplayDialog={setDisplayDialog}
                setDeleteUser={setDeleteUser}
                setDetailsModalShown={setDetailsModalShown}
            /> }

        </div>
    );
};

export default Details;
