import React, {useEffect, useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../AssignEditHomeworkForm/AssignEditHomeworkForm";
import "./HomeworkDetailsAndResponses.css"
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import AnswersTable from "../AnswersTable/AnswersTable";
import getKeycloakRoles from "../../../../utilities/GetRoles";
import {useKeycloak} from "@react-keycloak/web";

const homeworkData = {
    title: "Example homework",
    group: "1D",
    subject: "Polish",
    deadline: "10/10/2021",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    toEvaluate: true,
    answers: [{
        review: "REVIEW lorem ipsum dolor sit amet",
        files: [{
            filename: "filename_xd",
            uri: "/what/is/it"
        },
            {
                filename: "filename_xd2",
                uri: "/what/is/it2"
            }],
        grade: {
            grade: "4"
        },
        user: {
            firstName: "Rafal",
            lastName: "Brzozowski"
        },
        lastUpdatedTime: "21-21-2021",
        createdTime: "11-21-2021"
    },
        {
            review: "REVIEW lorem ipsum dolor sit amet",
            files: [{
                id: "1234",
                filename: "filename_xd",
                uri: "/what/is/it"
            },
                {
                    filename: "filename_xd2",
                    uri: "/what/is/it2"
                }],
            // grade: {
            //     grade: "4"
            // },
            user: {
                firstName: "Rafal",
                lastName: "Brzozowski"
            },
            lastUpdatedTime: "21-21-2021",
            createdTime: "11-21-2021"
        }
    ],
}

const HomeworkDetailsAndResponses = (props) => {
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");


    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])

    return (
        <div>
            <div className="HomeworkDetailsAndResponses">

                {role === "TEACHER" &&
                <ButtonWrapper label={"Delete"} onClick={() => setShowDeleteDialog(true)}
                               className="HomeworkDetails__button" style={{margin: "5px"}}/>}

                {role === "TEACHER" &&
                <ButtonWrapper label={"Edit"} onClick={() => setShowEditDialog(true)}
                               className="HomeworkDetails__button" style={{margin: "5px"}}/>}

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

                <Modal isOpen={showEditDialog} setIsOpen={setShowEditDialog}>
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
            {role === "TEACHER" &&
            <AnswersTable
                answers={homeworkData.answers}/>}
        </div>
    )
}

export default HomeworkDetailsAndResponses;