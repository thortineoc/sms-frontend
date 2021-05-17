import React, {useState} from 'react';
import './Grade.css';
import MouseOverPopover from "../Popover/Popover";
import '../../../../components/Modal/Modal';
import Modal from "../../../../components/Modal/Modal";
import GradesCreateEditForm from "../GradesCreateEditForm/GradesCreateEditForm";

const convertGrade = value => {
    const gradeArr = value.toString().split('.');
    if(gradeArr[1] && gradeArr[1] === '5') {
        gradeArr[1] = '+';
    } else {
        gradeArr[0] = parseInt(gradeArr[0]) + 1;
        gradeArr[1] = '-';
    }
    return gradeArr.join('');
}

const Grade = ({role, value, type, setRefresh}) => {
    const [show, setShow] = useState(false);
    const [grade, setGrade] = useState({});
    const classes = `Grade Grade-weight${value.weight} Grade-${type} Grade-${role}`

    let result = value.grade;
    if(!Number.isInteger(result)) {
        result = convertGrade(result)
    }

    const handleClick = (value) => {
        if(role === 'TEACHER') {
            setGrade(value);
            setShow(true);
        }
    }

    return (
        <>
            <MouseOverPopover weight={value.weight}
                              description={value.description}
                              lastUpdated={value.modifyTime}
                              subject={value.subject}
            >
                <div className="Grade-wrapper" onClick={() => handleClick(value)}>
                    <div id={"grade_"+value.id} className={classes}>
                        {result}
                    </div>
                </div>
            </MouseOverPopover>
            {show && (
                <Modal isOpen={show} setIsOpen={setShow}>
                    <GradesCreateEditForm
                        type={"MODIFY"}
                        existingGrade={grade}
                        setIsOpen={setShow}
                        setRefresh={setRefresh}
                    />
                </Modal>
            )}
        </>
    )
};

export default Grade;
