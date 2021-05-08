import React, {useState} from "react";
import ButtonWrapper from "../../components/Button/ButtonWrapper";
import Modal from "../../components/Modal/Modal";
import AssignEditHomeworkForm from "./components/AssignEditHomeworkForm";


const HomeworkView = (props) => {
    const [state, setState] = useState(false);


    return (
        <div>
        <ButtonWrapper label={"add"} onClick={() => setState(true)}/>
        <Modal isOpen={state} setIsOpen={setState}>
            <AssignEditHomeworkForm
            type={"ADD"}
            subjects={["Polish", "Math"]}
            />
        </Modal>
        </div>
    )
}

export default HomeworkView;