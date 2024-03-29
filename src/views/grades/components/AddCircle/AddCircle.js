import React, {useState} from 'react';
import './AddCircle.css';
import {PlusCircleIcon} from "@heroicons/react/solid";
import Modal from "../../../../components/Modal/Modal";
import GradesCreateEditForm from "../GradesCreateEditForm/GradesCreateEditForm";

const AddCircle = ({studentId, type, subject, setRefresh, answer}) => {
    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(true);
    }

    return (
        <>
            <div id={'add_'+type+'_'+studentId} className="addCircle">
                <PlusCircleIcon onClick={handleClick} />
            </div>
            {show && (
                <Modal isOpen={show} setIsOpen={setShow}>
                    <GradesCreateEditForm
                        type={type}
                        setIsOpen={setShow}
                        newGradeStudentId={studentId}
                        subject={subject}
                        setRefresh={setRefresh}
                        answer={answer}
                    />
                </Modal>
            )}
        </>
    );
};

export default AddCircle;
