import React, {useState} from 'react';
import './AddCircle.css';
import {PlusCircleIcon} from "@heroicons/react/solid";
import Modal from "../../../../components/Modal/Modal";
import GradesCreateEditForm from "../GradesCreateEditForm/GradesCreateEditForm";

const AddCircle = ({studentId, type}) => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    }

    return (
        <>
            <div className="addCircle">
                <PlusCircleIcon onClick={handleClick} />
            </div>
            {show && (
                <Modal isOpen={show} setIsOpen={setShow}>
                    <GradesCreateEditForm
                        type={type}
                        setIsOpen={setShow}
                        newGradeStudentId={studentId}
                    />
                </Modal>
            )}
        </>
    );
};

export default AddCircle;
