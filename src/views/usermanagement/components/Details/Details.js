import React, {useState} from 'react';
import './Details.css';
import { TrashIcon } from "@heroicons/react/outline";
import {Dialog} from "@material-ui/core";
import Modal from "../Modal/Modal";
import DialogBox from "../DialogBox/DialogBox";

const Details = ({user, setShowEdit, setDetailsModalShown}) => {
    const [displayDialog, setDisplayDialog] = useState(false);
    const [deteleUser, setDeleteUser] = useState('');

    const handleClick = () => {
        if(!displayDialog) {
            setShowEdit(true);
        }
    }

    const openDialog = () => {
        setDisplayDialog(true);
    }

    return (
        <div className="Details">

            <h3>Personal information</h3>
            <div className="Details__student-grid">
                <div className="Details__field">
                    <div className="Details__label">First name</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.firstName ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Middle name</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {(user.customAttributes && user.customAttributes.middleName) ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Last name</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.lastName ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">PESEL</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.pesel ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">E-mail address</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {(user.customAttributes && user.customAttributes.email) ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Phone number</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {(user.customAttributes && user.customAttributes.phoneNumber) ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">User Id</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.id ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Username</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.userName ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Group</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {(user.customAttributes && user.customAttributes.group) ?? '-'}
                    </div>
                </div>
            </div>

            <h3>Parent contact information</h3>
            <div className="Details__parent-grid">
                <div className="Details__field">
                    <div className="Details__label">Address e-mail</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {(user.customAttributes && user.customAttributes.email) ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Phone number</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {(user.customAttributes && user.customAttributes.phoneNumber) ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">User Id</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.id ?? '-'}
                    </div>
                </div>
                <div className="Details__field">
                    <div className="Details__label">Username</div>
                    <div className="Details__data"
                         onClick={handleClick}>
                        {user.userName ?? '-'}
                    </div>
                </div>
            </div>

            <div className="Details__delete-wrapper">
                 <TrashIcon className="Details__delete" onClick={() => setDisplayDialog(true)} />
            </div>

            { displayDialog && <DialogBox
                setDisplayDialog={setDisplayDialog}
                setDeleteUser={setDeleteUser}
                setDetailsModalShown={setDetailsModalShown}
            /> }

        </div>
    );
};

export default Details;
