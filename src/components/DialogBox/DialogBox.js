import React, {useCallback} from 'react';
import ButtonWrapper from "../Button/ButtonWrapper";
import './DialogBox.css';


const DialogBox = ({deleteFunction, setDisplayDialog, prompt, isModal}) => {


    const handleAccept = () => {
        setDisplayDialog(false);
        deleteFunction();
    }

    const handleCancel = () => {
        setDisplayDialog(false);
    }

    return (
        <div className={(isModal ? "DialogBoxModal" : "DialogBox")}>
            <strong>Are you sure that you want to delete this {prompt}?</strong>
            <div className="DialogBox__options">
                <ButtonWrapper id="yes" label='Yes' onClick={handleAccept}/>
                <ButtonWrapper id="no" label='No' onClick={handleCancel}/>
            </div>
        </div>
    );
};

export default DialogBox;
