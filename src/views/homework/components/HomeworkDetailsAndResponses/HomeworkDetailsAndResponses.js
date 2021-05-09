import React, {useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../AssignEditHomeworkForm/AssignEditHomeworkForm";
import "./HomeworkDetailsAndResponses.css"
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const homeworkData = {
    title: "Zadanie o czymś tam",
    description: "To jest opis tego zadania",
    subject: "Polish",
    group: "1D",
    deadline: "10/10/2021"
}

const HomeworkDetailsAndResponses = (props) => {
    const [state, setState] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    return (
        <div className="HomeworkDetailsAndResponses">
            <ButtonWrapper label={"Delete"} onClick={() => setShowDeleteDialog(true)} className="HomeworkDetails__button" style={{margin: "5px"}}/>
            <ButtonWrapper label={"Edit"} onClick={() => setState(true)} className="HomeworkDetails__button" style={{margin: "5px"}}/>

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
                <div className="DetailsHomework__label">Group</div>
                <div className="DetailsHomework__data_small">
                    {homeworkData.group}
                </div>
            </div>

            <div className="DetailsHomework__field">
                <div className="DetailsHomework__label">Subject</div>
                <div className="DetailsHomework__data_small">
                    {homeworkData.subject}
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

            <Modal isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog}>
                <DeleteDialog setDisplayDialog={setShowDeleteDialog}/>
            </Modal>

        </div>
    )
}

export default HomeworkDetailsAndResponses;