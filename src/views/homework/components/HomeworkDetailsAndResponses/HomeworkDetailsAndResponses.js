import React, {useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../AssignEditHomeworkForm/AssignEditHomeworkForm";
import "./HomeworkDetailsAndResponses.css"

const homeworkData = {
    title: "Zadanie o czymś tam",
    description: "To jest opis tego zadania",
    subject: "Polish",
    group: "IIA",
    deadline: "2021/10/10"
}

const HomeworkDetailsAndResponses = (props) => {
    const [state, setState] = useState(false);

    return (
        <div className="HomeworkDetailsAndResponses">
            <ButtonWrapper label={"Edit"} onClick={() => setState(true)} className="HomeworkDetails__button"/>

            <h3>Homework details</h3>


            <div className="DetailsHomework__field">
                <div className="DetailsHomework__label">Title</div>
                <div className="DetailsHomework__data">
                    {homeworkData.title}
                </div>
            </div>

            <div className="DetailsHomework__field">
                <div className="DetailsHomework__label">Description</div>
                <div className="DetailsHomework__data">
                    {homeworkData.description}
                </div>
            </div>

            <div className="DetailsHomework__field">
                <div className="DetailsHomework__label">Subject</div>
                <div className="DetailsHomework__data_small">
                    {homeworkData.subject}
                </div>
            </div>

            <div className="DetailsHomework__field">
                <div className="DetailsHomework__label">Group</div>
                <div className="DetailsHomework__data_small">
                    {homeworkData.group}
                </div>
            </div>

            <div className="DetailsHomework__field">
                <div className="DetailsHomework__label">Deadline</div>
                <div className="DetailsHomework__data_small">
                    {homeworkData.deadline}
                </div>
            </div>










            <Modal isOpen={state} setIsOpen={setState}>
                <AssignEditHomeworkForm
                    type={"MODIFY"}
                    subjects={["Polish", "Math"]}
                    homeworkDetails={homeworkData}
                />
            </Modal>
        </div>
    )
}

export default HomeworkDetailsAndResponses;