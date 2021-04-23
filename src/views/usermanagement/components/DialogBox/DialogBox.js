import React from 'react';
import Button from "../../../../components/Button/Button";
import './DialogBox.css';

const DialogBox = ({setDisplayDialog, setDeleteUser}) => {

    const handleAccept = () => {

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
