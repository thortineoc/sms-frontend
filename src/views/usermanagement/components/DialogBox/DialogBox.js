import React from 'react';
import Button from "../../../../components/Button/Button";
import './DialogBox.css';

const DialogBox = ({setDisplayDialog, setDeleteUser, setDetailsModalShown}) => {

    const handleAccept = () => {
        //deletedelete
        setDetailsModalShown(false);
    }

    const handleCancel = () => {
        setDisplayDialog(false);
    }

    return (
        <div className="DialogBox">
            <strong>Are you sure that you want to delete this account?</strong>
            <div className="DialogBox__options">
                <Button label='Yes' onClick={handleAccept}/>
                <Button label='No' onClick={handleCancel}/>
            </div>
        </div>
    );
};

export default DialogBox;
