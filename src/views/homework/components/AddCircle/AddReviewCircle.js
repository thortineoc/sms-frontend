import React, {useState} from 'react';
import './AddReviewCircle.css';
import {PlusCircleIcon, BadgeCheckIcon} from "@heroicons/react/solid";
import Modal from "../../../../components/Modal/Modal";
import AddEditReview from "../AddEditReview/AddEditReview";


const AddReviewCircle = (props) => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    }

    return (
        <>
            <div className="addCircle">
                <BadgeCheckIcon onClick={handleClick} />
            </div>
            {show && (
                <Modal isOpen={show} setIsOpen={setShow}>
                    <AddEditReview row={props.row} setShow={setShow} setRefresh={props.setRefresh}/>
                </Modal>
            )}
        </>
    );
};

export default AddReviewCircle;
