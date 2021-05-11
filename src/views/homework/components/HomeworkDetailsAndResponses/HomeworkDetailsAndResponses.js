import React, {useEffect, useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../AssignEditHomeworkForm/AssignEditHomeworkForm";
import "./HomeworkDetailsAndResponses.css"
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import AssignmentsTable from "../AssigmentsTable/AssignmentsTable";
import getKeycloakRoles from "../../../../utilities/GetRoles";
import {useKeycloak} from "@react-keycloak/web";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import DatepickerWrapper from "../../../../components/DatepickerWrapper/DatepickerWrapper";

const homeworkData = {
    title: "Example homework",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    subject: "Polish",
    group: "1D",
    deadline: "10/10/2021"
}

const HomeworkDetailsAndResponses = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");
    const[error, setError] = useState("");

    const handleClick = () => {
        setShowEdit(true)
    }

    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])

    const detailsPage = () =>{
        return (
            <div className="HomeworkDetailsAndResponses">

                {role==="TEACHER" &&
                <ButtonWrapper label={"Delete"} onClick={() => setShowDeleteDialog(true)} className="HomeworkDetails__button" style={{margin: "5px"}}/>}

                <h3>Homework details {props.id}</h3>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Title</div>
                    <div className="DetailsHomework__data" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.title}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Description</div>
                    <div className="DetailsHomework__data" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.description}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Group</div>
                    <div className="DetailsHomework__data_small" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.group}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Subject</div>
                    <div className="DetailsHomework__data_small" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.subject}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Deadline</div>
                    <div className="DetailsHomework__data_small" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.deadline}
                    </div>
                </div>
            </div>
        )
    }

    const editPage = () => {
        return (
            <div className="HomeworkDetailsAndResponses">
            <Formik
                initialValues={homeworkData}
                //validationSchema={validationSchema}
                validateOnChange={false}
                onSubmit={() => setShowEdit(false)}
            >
                {
                    formik => {
                        return (
                            <Form>
                                <ButtonWrapper type="submit" label="Save" disabled={formik.isSubmitting} className="HomeworkDetails__button" />
                                <h3>Modify assignment</h3>
                                {(error.length>0 ? <p>{error}</p> : <div/>)}
                                <div>
                                    {formik.errors && formik.errors.submit &&
                                    <div className="error">{formik.errors.submit}</div>}

                                    <TextFieldWrapper
                                        label="Title"
                                        name="title"
                                        type="text"
                                        style={{}}
                                        className={"textFieldEditHomework"}
                                    />

                                    <TextFieldWrapper
                                        label="Description"
                                        name="description"
                                        type="text"
                                        multiline
                                        rowsMax={6}
                                        style={{}}
                                        className={"textFieldEditHomework"}
                                    />

                                    <SelectFieldWrapper
                                        label="Group"
                                        name="group"
                                        options={[1,2,3]}
                                        style={{}}
                                        className={"textFieldEditHomeworkSmall"}
                                    />

                                    <SelectFieldWrapper
                                        label="Subject"
                                        name="subject"
                                        options={props.subjects}
                                        style={{}}
                                        className={"textFieldEditHomeworkSmall"}
                                    />


                                    <DatepickerWrapper
                                        name={"deadline"}
                                        label={"Deadline"}
                                        style={{margin: "0"}}

                                    />

                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
            </div>
        )
    }

    return (
        <div>
            {showEdit ? editPage() : detailsPage()}
            {role==="TEACHER" &&
            <AssignmentsTable/>}
            <Modal isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog}>
                <DeleteDialog setDisplayDialog={setShowDeleteDialog}/>
            </Modal>
        </div>

    )
}

export default HomeworkDetailsAndResponses;