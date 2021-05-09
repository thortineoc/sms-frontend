import React, {useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../AssignEditHomeworkForm/AssignEditHomeworkForm";
import "./HomeworkDetailsAndResponses.css"
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const homeworkData = {
    title: "Example homework",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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

            <h3>Homework details {props.id}</h3>

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