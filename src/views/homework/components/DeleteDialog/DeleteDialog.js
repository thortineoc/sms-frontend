import React from 'react';
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import "./DeleteDialog.css"

const DeleteDialog = ({id, setDisplayDialog}) => {

    const handleAccept = () => {
        console.log("delete")
        setDisplayDialog(false);
    }

    const handleCancel = () => {
        setDisplayDialog(false);
    }

    return (
        <div className="DeleteDialogBox">
            <strong>Are you sure that you want to delete this assignment?</strong>
            <div className="DeleteDialogBox__options">
                <ButtonWrapper label='Yes' onClick={handleAccept}/>
                <ButtonWrapper label='No' onClick={handleCancel}/>
            </div>
        </div>
    );
};

export default DeleteDialog;
